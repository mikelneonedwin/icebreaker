type GameData = {
  id: string;
  content: string;
};
declare module "virtual:db" {
 export const most_likely_to: GameData[];
 export const two_truths_and_a_lie: GameData[];
 export const never_have_i_ever: GameData[];
 export const how_well_do_you_know_me: GameData[];
 export const deep_cuts: GameData[];
 export const would_you_rather: GameData[];
 export const hot_takes: GameData[];
 export const rapid_fire: GameData[];
}
