export interface News{
  author: string,
  story_title: string,
  story_url: string,
  created_at: string,
}

// export interface Children{
//   id: string,
//   create_at: string,
//   create_at_i: string,
//   type: string,
//   author: string,
//   title: string,
//   url: string,
//   text: string,
//   points: string,
//   parent_id: string,
//   story_id: string,
//   children: string[],
// }

// export interface News{
//   id: string,
//   create_at: string,
//   create_at_i: string,
//   type: string,
//   author: string,
//   title: string,
//   url: string,
//   text: string,
//   points: string,
//   parent_id: string,
//   story_id: string,
//   children: Children,
// }


export interface ApiResponse{
  create_at: string,
  url: string,
  title: string,
  author: string,

  id: News,
  create_at_i: News,
  type: News,
  text: News,
  points: News,
  parent_id: News,
  story_id: News,
  children: News,

}

