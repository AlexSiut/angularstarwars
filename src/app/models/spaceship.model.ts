export class detailSpaceship{
  constructor(public id: number,
              public name: string,
              public model: string,
              public picture?: string,
              public manufacturer?: string,
              public cost_in_credits?: number,
              public length?: number,
              public max_atmosphering_speed?: number,
              public crew?: string,
              public passengers?: string,
              public cargo_capacity?: number,
              public consumables?: string,
              public hyperdrive_rating?: string,
              public MGLT?: number,
              public starship_class?: string,
              public pilots?: any[],
              public listPilots?:number[],
              public url?: string) {
  }
}
