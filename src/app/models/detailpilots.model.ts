export class detailPilot{
  constructor(public id: number,
              public name: string,
              public height?: string,
              public mass?: string,
              public hair_color?: string,
              public skin_color?: string,
              public eye_color?: string,
              public birth_year?: string,
              public gender?: string,
              public homeworld?: string,
              public url?: string,
              public picture?: string,
              public urlHomeWorld?: string,
              public starships?: string[],
              public species?: string[]
              ) {
  }
}
