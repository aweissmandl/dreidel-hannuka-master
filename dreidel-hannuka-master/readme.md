# Dreidel Project

## Data Structure

### List of players
    - Array of 3 Elements

#### Player
- Object
    - name - String
    - balance - Number - initial = 50

#### Dreidel Constant
    - Array of charachters
        N
        G
        H
        S


### GameState
- Object
    - potBalance - Number
    - currentPlayer - Number (Index number of the players array) - initial = 0


## User Interface

### Form
- 3 Inputs
    - type text

### Start Button
    - Start
        - Hide the form
        - Submit the form - create the players array
        - Generate the Game Board
        - loop through players and substract 1 from each
        - add 1 token to pot


### Game Board
    - Table 
        - list of players
            - Name
            - Balance
            - Background color of the current player = green
            - Is Still Playing ?

    - Pot Balance
        - Number of tokens

    - Display drawn charachters as an image


### Spin Button 
    - When clicked
        - Find a random number 0-3
        - Do the action according to charchater
            Display image of charachter
            - 0 => N - Do nothing
            - 1 => G - Add balance of pot to balance of current user
                    - Set balance of pot to 0
                    - loop through players and substract 1 from each active player
                    - add 1 token to pot
            - 2 => H - Get balance of pot divided in 2 (rounded up)
                    - add to balance of current user
                    - Substract from pot
                    - if pot is empty - each gives one
            - 3 => S - Substract 1 of current user 
                    - Add 1 to pot

                


        - Find the next player
            - save a copy of current index
            - increase index by 1
            - if index = players.length set to 0
            - if player's balance is zero - 
                - do that again as long as we don't reach the original index
                - if we reached original index - we have a winner!
            
    