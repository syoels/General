import enchant
from copy import deepcopy

    
#===================================
#           Ruzzle Solver!
#===================================

def solveRuzzle(ruzzle16letters):
    
    #legal moves, dictionary
    d = enchant.Dict("en_US")
    ahvi = ["a","e","u","i","o","y"]
    solutions = []
    legalMoves = {0:[1,4,5],
                  1:[0,2,4,5,6],
                  2:[1,3,5,6,7],
                  3:[2,6,7],
                  4:[0,1,5,8,9],
                  5:[0,1,2,4,6,8,9,10],
                  6:[1,2,3,5,7,9,10,11],
                  7:[2,3,6,10,11],
                  8:[4,5,9,12,13],
                  9:[4,5,6,8,10,12,13,14],
                  10:[5,6,7,9,11,13,14,15],
                  11:[6,7,10,14,15],
                  12:[8,9,13],
                  13:[8,9,10,12,14],
                  14:[9,10,11,13,15],
                  15:[10,11,14]}
    
    #recursive helper function
    def solveRuzzleRec(currLetter, visitedLetters, currWord, badSeriesLength):
        nonlocal legalMoves
        nonlocal solutions
        nonlocal d
        nonlocal ahvi
        #print("enter with curr: "+str(currLetter)+", visited: "+str(visitedLetters)+", word: "+currWord)

        #impossible seq
        if(badSeriesLength > 3):
            return;

        #max length allowed 
        currlen = len(currWord);
        if(currlen > 9):
            return

        if(currlen > 5):
            if(d.check(currWord)):
                solutions.append(currWord)
                #real time good words out
                print(currWord)


        #legal movements
        #allPossibleMoves = deepcopy(legalMoves[currLetter])
        allPossibleMoves = legalMoves[currLetter]
        AllLegal = []
        for i in allPossibleMoves:
            if i not in visitedLetters:
                AllLegal.append(i)

        currSeriesLen = badSeriesLength
        
        for letter in AllLegal:
            #update length of current "bad" sequence (i.e. "strf" or "aeei")
            if ((ruzzle16letters[currLetter] in ahvi and ruzzle16letters[letter] not in ahvi) or \
                (ruzzle16letters[currLetter] not in ahvi and ruzzle16letters[letter] in ahvi) or \
                (ruzzle16letters[currLetter] == ruzzle16letters[letter] in ahvi)):
                currSeriesLen = 0
            nextWord = currWord+ruzzle16letters[letter]
            solveRuzzleRec(letter, visitedLetters+[currLetter], nextWord, currSeriesLen+1)

        return

    #start from each letter in board
    for i in range(len(ruzzle16letters)):
        solveRuzzleRec(i, [], ruzzle16letters[i],0)


    return solutions




                
        
#===================================
#           Main Program
#===================================

lets = input("Insert 16 Ruzzle board letters.\n")

while(len(lets) != 16):
    lets = input("You didnt insert 16 letters. insert again.\n")

sol = solveRuzzle(lets)
sol = list(set(sol))
sol.sort(key = lambda s: len(s))
for i in sol:
    print(i)
        


