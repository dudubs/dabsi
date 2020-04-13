# JSONExp for TypeORM.

TypeORM-exp is a solution to make more readable and safety questions from a database.

## Advantages

-  The query structure depends on the model structure, the query error detection is identified by TypeScript compiler.

- Performing deep queries and keeping them readable.

## Install
``` 
npm i @dabsi/typeorm-exp
```
## Usage
```
import {useQueryBuilderExp} from "@dabsi/typeorm-exp";

useQueryBuilderExp();
```
    

## SelectQueryBuilder methods

- .selectExp(exp, alias?) like .select(...)
- .addSelectExp(exp, alias?) like .addSelect
- .whereExp(exp, ...) like .where...
- ... orderBy


## Examples

### entities
```
entity Movie {
    primaryColumn title: string
    primaryColumn year: number;
    manyToMany stars: Person[];
    manyToMany writers: Person[];
    oneToOne director: Person;
}

entity Person {
    primaryColumn firstName: string;
    primaryColumn lastName: string;

    
    manyToMany starInMovies: Movie[]
    manyToMany directorInMovies: Movie[]
    manyToMany writerInMovies: Movie[]
}
```
### types
```
const movieQb: ()=> SelectQueryBuilder<Movie>;

const personFullNameExp: JSONExp<Person> = {
    $concat: [
        "firstName",
        {$value: " "},
        "lastName"
    ]
}; 
```

#### relation expressions
##### $at (one-to-one, one-to-many)
```
// get all movies they director first name is "James"
movieQb().whereExp({
    $at: {director: {
        firstName: "James"
    }}
})

// get ... director fullName startsWith "James".
movieQb().whereExp({
    $at: {director: [
        personFullNameExp,
        "$startsWith",
        "James"
    ]}
}) 
```
##### $count (one-to-many)
```
// get all movies they have more than 3 stars.
movieQb().whereExp([
    {$count:"stars"},
    "$greaterThen",
    3
])
// get all movies they have more than 3 stars with last name ends with "Cohen".
movieQb().whereExp([
    {$count:{stars: {
        lastName: {$endsWith:"Chen"}
    }},
    "$greaterThen",
    3
])
```

##### $has (one-to-many)
like $count but give if have least one match
```
// get movie with least one star
movieQb ... whereExp({
    $has: "stars"
})
// get movie with least one star his last name equals to "Cohen"
movieQb ... whereExp({
    $has: {stars: {
        lastName: "Choen"
    }}
})
```
##### $from (one-to-many)
```
// select from stars of movie the first star with full name with length greater then 10.
movieQb ... selectExp({
    $from: {stars: {
        take: personFullNameExp,
        where: [
            {$length: personFullNameExp},
            ">",
            10
        ]
    }} 
})
```

##### more deep relations
```
// get movies with stars they acter and also director
movieQb ... whereExp({
    $has: {
        stars: {
            $all: [
                {$has: "starInMovies"},
                {$has: "directorInMovies"},
             ]
        }
    }
})
// unlimited...
movieQb ... whereExp({
    $count: {acters: {
        $has: {starInMovies: {
            $count: {stars: {
                .....
            }}
        }}
    }}
})
```

### Logical

#### $all, $any
like '&&' and '||' in JS:
```
{$any:[
    {firstName: "James"},
    {lastName: "Choen"}
]}
```

### Comparision

- between field to value
```
{firstName: "James"},
{fullName: {$startsWith: "James"}}
```
- between field to expression
```
{fullName: ["$startsWith", {$value: "James"}]}
```
- between expression to expression
```
[{$length: "firstName"},">",{$length:"lastName"}]
// or 
[{$length: "firstName"},">",10]
```

#### $in, $notIn

```
{firstName: {$in: [
    "James",
    "Leonardo",
    ...
]}}
```

#### operators
- $equals, '='
- $notEqual, '!='
- $lessThan, '<'
- $lessThanOrEqual, '<='
- ... greaterThan ...
- $startsWith, '^='
- $endsWith, '$='
- $contains, '*='

### Functions

- $length: get the length of expression as a string
- $concat: concat between expressions as a string
