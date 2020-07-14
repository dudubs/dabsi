import {
    BaseEntity,
    Column,
    Connection,
    createConnection,
    DeepPartial,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    ObjectType, OneToMany,
    PrimaryColumn,
    SelectQueryBuilder
} from "typeorm";
import {DataExp} from "../../../json-exp/DataExp";
import {useQueryBuilderExp} from "../useQueryBuilderExp";

@Entity()
class Person {

    @PrimaryColumn()
    firstName: string;

    @PrimaryColumn()
    lastName: string;

    @OneToMany(() => Movie, movie => movie.director)
    moviesAsDirector: Movie[];
}


@Entity()
class Movie extends BaseEntity {

    @PrimaryColumn()
    title: string;

    @PrimaryColumn()
    year: number;

    @ManyToMany(() => Person, {cascade: true})
    @JoinTable()
    writers: Person[];

    @ManyToMany(() => Person, {cascade: true})
    @JoinTable()
    stars: Person[];

    @ManyToOne(() => Person, {cascade: true})
    director: Person;

    @Column({nullable: true})
    storyline: string;
}


function person(fullName: string) {
    const [firstName, lastName] = fullName.split(" ");

    return {
        firstName, lastName
    }
}

const MOVIES: Array<DeepPartial<Movie>> = [
    {
        title: "Titanic", year: 1997,
        director: person("James Cameron"),
        writers: [person("James Cameron")],
        stars: [
            person("Leonardo DiCaprio"),
            person("Kate Winslet")
        ],
        storyline: `84 years later, a 100 year-old woman named Rose DeWitt Bukater tells the story to her granddaughter Lizzy Calvert, Brock Lovett, Lewis Bodine, Bobby Buell and Anatoly Mikailavich on the Keldysh about her life set in April 10th 1912, on a ship called Titanic when young Rose boards the departing ship with the upper-class passengers and her mother, Ruth DeWitt Bukater, and her fiancé, Caledon Hockley. Meanwhile, a drifter and artist named Jack Dawson and his best friend Fabrizio De Rossi win third-class tickets to the ship in a game. And she explains the whole story from departure until the death of Titanic on its first and last voyage April 15th, 1912 at 2:20 in the morning.`
    },
    {
        title: "Avatar", year: 2009,
        director: person("James Cameron"),
        stars: [
            person("Sam Worthington")
        ],
        writers: [
            person("James Cameron")
        ],
        storyline: `When his brother is killed in a robbery, paraplegic Marine Jake Sully decides to take his place in a mission on the distant world of Pandora. There he learns of greedy corporate figurehead Parker Selfridge's intentions of driving off the native humanoid "Na'vi" in order to mine for the precious material scattered throughout their rich woodland. In exchange for the spinal surgery that will fix his legs, Jake gathers knowledge, of the Indigenous Race and their Culture, for the cooperating military unit spearheaded by gung-ho Colonel Quaritch, while simultaneously attempting to infiltrate the Na'vi people with the use of an "avatar" identity. While Jake begins to bond with the native tribe and quickly falls in love with the beautiful alien Neytiri, the restless Colonel moves forward with his ruthless extermination tactics, forcing the soldier to take a stand - and fight back in an epic battle for the fate of Pandora.`
    }

]
let connection: Connection;

const QB = <T>(type: ObjectType<T>): SelectQueryBuilder<T> =>
    connection.getRepository(type).createQueryBuilder();

let firstMovie: Movie;
let firstPerson: Person;

beforeAll(async () => {
    connection = await createConnection({
        type: "sqlite",
        name: __filename,
        database: ":memory:",
        synchronize: true,
        entities: [Person, Movie]
    });

    const movies = connection.getRepository(Movie);
    await movies.save(
        MOVIES.map(data => movies.create(data))
    );

    firstMovie = await movies.findOneOrFail();
    firstPerson = await connection.getRepository(Person).findOneOrFail();
})

useQueryBuilderExp();


const personFullNameExp: DataExp<Person> = {
    $concat: [
        "firstName",
        {$value: " "},
        "lastName"
    ]
}


it('$length', async () => {
    expect(await QB(Person)
        .selectExp({$length: "firstName"}, "firstNameLength")
        .getRawOne()
    ).toEqual({
        firstNameLength: firstPerson.firstName.length
    });
});

it('$concat', async () => {
    expect(await QB(Person)
        .selectExp(personFullNameExp, "fullName")
        .getRawOne()
    ).toEqual({
        fullName: `${firstPerson.firstName} ${firstPerson.lastName}`
    });
})

it('$search', async () => {
    expect(await QB(Movie)
        .whereExp({
            $search: {
                in: "storyline",
                text: "ship when Rose"
            }
        })
        .getOne()
    ).toEqual(firstMovie);
})


it('$at', async () => {
    expect(await QB(Movie).whereExp({
        $at: {
            director: {
                firstName: "James"
            }
        }
    }).getOne()).toBeTruthy()
});

it('$count', async () => {

    const qb = QB(Movie)
        .selectExp("title", "title")
        .addSelectExp({$count: "writers"}, "countWriters")
    ;


    expect(await qb.getRawMany()).toEqual(
        jasmine.arrayContaining(
            MOVIES.map(m => ({
                title: m.title,
                countWriters: m?.writers?.length
            }))
        )
    )
});

it('$from', async () => {

    // get other star full name in movie with Leonardo DiCaprio.
    const {movieTitle, starFullName} = await QB(Movie)
        .whereExp({
            $has: {stars: {lastName: "DiCaprio"}}
        })
        .selectExp("title", "movieTitle")
        .addSelectExp({
            $from: {
                stars: {
                    take: personFullNameExp,
                    where: {
                        lastName: {$notEquals: "DiCaprio"}
                    }
                }
            }
        }, "starFullName")
        .getRawOne();

    expect(starFullName).toBeTruthy();
    expect(starFullName).not.toEqual("Leonardo DiCaprio");
    expect(movieTitle).toBeTruthy()
});


it('one-to-many', async () => {
    expect(await QB(Person)
        .andWhereExp({$has: "moviesAsDirector"})
        .getCount()).toBeGreaterThan(0);
});
