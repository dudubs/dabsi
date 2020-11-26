import { ChildEntity, Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { DataRelation } from "../../../typedata/DataRelation";
import { Menu } from "../menu/Menu";
import { SystemEntity } from "../SystemEntity";

@Entity()
export class Page extends SystemEntity({ withOwners: true }) {
  @ManyToOne(() => PageCategory, c => c.pages)
  category: DataRelation<PageCategory>;

  @Column()
  createdDate: Date;

  @Column()
  publishDate?: Date;

  @Column()
  content: string;
}

@Entity()
export class PageCategory extends SystemEntity() {
  @OneToMany(() => Page, p => p.category)
  pages: DataRelation<Page>[];
}

@ChildEntity()
export class PageMenu extends Menu {
  @ManyToOne(() => Page)
  page: DataRelation<Page>;
}

// RichTextInput
// RichText({
//
// plugins: {
//    image: RichTextImagePlugin()
//    RichTextLinkPlugin()
///   linkToPage: RichTextPagesLinkPlugin()
// }
//
// })

/*
RichText({
  pagesLinks: RTPagesLinksPlugin(),
  images: RTImagePlugin()

})


<RichTextView
  plugins={{
    pagesLinks: RTPagesLinksPluginView({
      options
    })
  }}/>

/*

RpcConfigResolver(MyRichText, {}, $ => $(...))

MyRichTextInput = RichTextInput(MyRichText)
/

 */

// RichTextWidget(richText, ....)
// RichTextView(connection, ..)
// RichTextInput(richText)
