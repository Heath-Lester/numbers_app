import { Ball } from './ball';
import { MegaBall } from './mega-ball';

export type WinningSet = {
	/** Date set was drawn */
	date: Date;
	/** Lowest number */
	firstBall: Ball;
	/** Second lowest number */
	secondBall: Ball;
	/** Third lowest number */
	thirdBall: Ball;
	/** Fourth lowest number */
	fourthBall: Ball;
	/** Last number */
	fifthBall: Ball;
	/** Mega ball */
	megaBall: MegaBall;
	/** Multiplier */
	megaplier: number;
	/** Number of jackpot winners */
	jackpotWinners: number;
	/** Number of winners with five matches */
	fiveMatchWinners: number;
	/** Number of winners with four matches and the mega ball match */
	fourMatchWithMegaWinners: number;
	/** Number of winners with four matches */
	fourMatchWinners: number;
	/** Number of winners with three matches and the mega ball match */
	threeMatchWithMegaWinners: number;
	/** Number of winners with three matches */
	threeMatchWinners: number;
	/** Number of winners with two matches and the mega ball match */
	twoMatchWithMegaWinners: number;
	/** Number of winners with one match and the mega ball match */
	oneMatchWithMegaWinners: number;
	/** Number of winners with the mega ball match */
	megaMatchWinners: number;
	/** Estimated total winnings with distribution option */
	estimatedJackpot: number;
	/** Jackpot Winnings with the cash option */
	cashOption: number;
	/** Winnings for five matches */
	fiveMatchPrize: number;
	/** Winnings for four matches and the mega ball match */
	fourMatchWithMegaPrize: number;
	/** Winnings for four matches */
	fourMatchPrize: number;
	/** Winnings for three matches and the mega ball match */
	threeMatchWithMegaPrize: number;
	/** Winnings for three matches */
	threeMatchPrize: number;
	/** Winnings for two matches and the mega ball match */
	twoMatchWithMegaPrize: number;
	/** Winnings for one matche and the mega ball match */
	oneMatchWithMegaPrize: number;
	/** Winnings the mega ball match */
	megaMatchPrize: number;
	/** Number of megaplier jackpot winners */
	jackpotMegaplierWinners: number;
	/** Number of megaplier winners with five matches */
	fiveMatchMegaplierWinners: number;
	/** Number of megaplier winners with four matches and the mega ball match */
	fourMatchWithMegaMegaplierWinners: number;
	/** Number of megaplier winners with four matches */
	fourMatchMegaplierWinners: number;
	/** Number of megaplier winners with three matches and the mega ball match */
	threeMatchWithMegaMegaplierWinners: number;
	/** Number of megaplier winners with three matches */
	threeMatchWithMegaplierWinners: number;
	/** Number of megaplier winners with two matches and the mega ball match */
	twoMatchWithWMegaMegaplierWinners: number;
	/** Number of megaplier winners with one matches and the mega ball match */
	oneMatchWithWMegaMegaplierWinners: number;
	/** Number of megaplier winners the mega ball match */
	megaMatchMegaplierWinners: number;
	/** Winnings for five matches with the megaplier multiplier */
	fiveMatchMegaplierPrize: number;
	/** Winnings for five matches and the mega ball match with the megaplier multiplier */
	fourMatchWithWMegaMegaplierPrize: number;
	/** Winnings for four matches with times the megaplier multiplier */
	fourMatchMegaplierPrize: number;
	/** Winnings for three matches and the mega ball match with the megaplier multiplier */
	threeMatchWithMegaMegaplierPrize: number;
	/** Winnings for three matches with times the megaplier multiplier */
	threeMatchMegaplierPrize: number;
	/** Winnings for two matches and the mega ball match with the megaplier multiplier */
	twoMatchWithWMegaMegaplierPrize: number;
	/** Winnings for one match and the mega ball match with the megaplier multiplier */
	oneMatchWithWMegaMegaplierPrize: number;
	/** Winnings for the mega ball match with the megaplier multiplier */
	megaMatchMegaplierPrize: number;
};
