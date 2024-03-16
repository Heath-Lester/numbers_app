import { WinningSet } from '../types/winning-set';
import { WinningSetPython } from '../types/winning-set-python';

function convertPythonSetToTypeScriptSet(
	pythonSet: WinningSetPython
): WinningSet {
	const typeScriptSet: WinningSet = {
		date: new Date(pythonSet.date),
		firstBall: pythonSet.first_ball,
		secondBall: pythonSet.second_ball,
		thirdBall: pythonSet.third_ball,
		fourthBall: pythonSet.fourth_ball,
		fifthBall: pythonSet.fifth_ball,
		megaBall: pythonSet.mega_ball,
		megaplier: pythonSet.megaplier,
		jackpotWinners: pythonSet.jackpot_winners,
		fiveMatchWinners: pythonSet.five_match_winners,
		fourMatchWithMegaWinners: pythonSet.four_match_winners,
		fourMatchWinners: pythonSet.four_match_winners,
		threeMatchWithMegaWinners: pythonSet.three_match_winners,
		threeMatchWinners: pythonSet.three_match_winners,
		twoMatchWithMegaWinners: pythonSet.two_match_w_mega_winners,
		oneMatchWithMegaWinners: pythonSet.one_match_w_mega_winners,
		megaMatchWinners: pythonSet.mega_match_winners,
		estimatedJackpot: pythonSet.estimated_jackpot,
		cashOption: pythonSet.cash_option,
		fiveMatchPrize: pythonSet.five_match_prize,
		fourMatchWithMegaPrize: pythonSet.four_match_w_mega_prize,
		fourMatchPrize: pythonSet.four_match_prize,
		threeMatchWithMegaPrize: pythonSet.three_match_w_mega_prize,
		threeMatchPrize: pythonSet.three_match_prize,
		twoMatchWithMegaPrize: pythonSet.two_match_w_mega_prize,
		oneMatchWithMegaPrize: pythonSet.one_match_w_mega_prize,
		megaMatchPrize: pythonSet.mega_match_prize,
		jackpotMegaplierWinners: pythonSet.jackpot_megaplier_winner,
		fiveMatchMegaplierWinners: pythonSet.five_match_megaplier_winners,
		fourMatchWithMegaMegaplierWinners:
			pythonSet.four_match_w_mega_megaplier_winners,
		fourMatchMegaplierWinners: pythonSet.four_match_megaplier_winners,
		threeMatchWithMegaMegaplierWinners:
			pythonSet.three_match_w_mega_megaplier_winners,
		threeMatchWithMegaplierWinners: pythonSet.three_match_megaplier_winners,
		twoMatchWithWMegaMegaplierWinners:
			pythonSet.two_match_w_mega_megaplier_winners,
		oneMatchWithWMegaMegaplierWinners:
			pythonSet.one_match_w_mega_megaplier_winners,
		megaMatchMegaplierWinners: pythonSet.mega_match_megaplier_winners,
		fiveMatchMegaplierPrize: pythonSet.five_match_megaplier_prize,
		fourMatchWithWMegaMegaplierPrize:
			pythonSet.four_match_w_mega_megaplier_prize,
		fourMatchMegaplierPrize: pythonSet.four_match_megaplier_prize,
		threeMatchWithMegaMegaplierPrize:
			pythonSet.three_match_w_mega_megaplier_prize,
		threeMatchMegaplierPrize: pythonSet.three_match_megaplier_prize,
		twoMatchWithWMegaMegaplierPrize:
			pythonSet.two_match_w_mega_megaplier_prize,
		oneMatchWithWMegaMegaplierPrize:
			pythonSet.one_match_w_mega_megaplier_prize,
		megaMatchMegaplierPrize: pythonSet.mega_match_megaplier_prize,
	};
	return typeScriptSet;
}

export function convertWinningSet(set: WinningSetPython): WinningSet {
	return convertPythonSetToTypeScriptSet(set);
}

export function convertWinningSets(
	sets: Array<WinningSetPython>
): Array<WinningSet> {
	return sets.map((set: WinningSetPython) =>
		convertPythonSetToTypeScriptSet(set)
	);
}
