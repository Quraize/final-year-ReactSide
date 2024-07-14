import { SurpriseMePrompts } from "../constants/SurpriseMePrompts";

export function getRandomPrompt() {
    const randomIndex = Math.floor(Math.random() * SurpriseMePrompts.length);
    const randomPrompt = SurpriseMePrompts[randomIndex];

    return randomPrompt;
}