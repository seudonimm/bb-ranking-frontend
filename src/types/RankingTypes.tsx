export interface RankingObject {
    wins:number
    losses:number
    matches:Match[]
    character_id:number
    name:string
    ranking:{
        rankScore:number
        deviation:number
    }
    steamID:number
};

export interface Match {
    date1:Date 
    p1_name:string
    p1_steamid64:string
    p1_toon:number
    p2_name:string
    p2_steamid64:string
    p2_toon:number
    recorder:string
    recorder_steamid64:string
    winner:number
}
