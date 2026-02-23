//Step 1: Data Structure

let phoneBook = [
  { name: "Avery", phone: "2125557810", city: "New York" },
  { name: "Maya", phone: "3105554421", city: "Los Angeles" },
  { name: "Ethan", phone: "7735559090", city: "Chicago" },
  { name: "Noah", phone: "3055551188", city: "Miami" },
  { name: "Liam", phone: "7135556624", city: "Houston" },
  { name: "Olivia", phone: "6025553471", city: "Phoenix" },
  { name: "Sophia", phone: "2155559033", city: "Philadelphia" },
  { name: "Mason", phone: "2105557742", city: "San Antonio" },
  { name: "Isabella", phone: "6195552389", city: "San Diego" },
  { name: "Lucas", phone: "2145555576", city: "Dallas" },
  { name: "Amelia", phone: "4085558244", city: "San Jose" },
  { name: "Benjamin", phone: "5125557001", city: "Austin" },
  { name: "Harper", phone: "9045552998", city: "Jacksonville" },
  { name: "Elijah", phone: "8175551065", city: "Fort Worth" },
  { name: "Evelyn", phone: "6145558812", city: "Columbus" },
  { name: "James", phone: "7045552640", city: "Charlotte" },
  { name: "Abigail", phone: "4155559731", city: "San Francisco" },
  { name: "Henry", phone: "3175555480", city: "Indianapolis" },
  { name: "Emily", phone: "2065554137", city: "Seattle" },
  { name: "Jack", phone: "3035551902", city: "Denver" },
  { name: "Scarlett", phone: "6175558019", city: "Boston" },
  { name: "Logan", phone: "6155553726", city: "Nashville" },
  { name: "Chloe", phone: "9155556604", city: "El Paso" },
  { name: "Wyatt", phone: "5035551179", city: "Portland" },
  { name: "Ella", phone: "3135559250", city: "Detroit" },
  { name: "Levi", phone: "2025557448", city: "Washington" },
  { name: "Grace", phone: "4105555367", city: "Baltimore" },
  { name: "Sebastian", phone: "4145556023", city: "Milwaukee" },
  { name: "Zoey", phone: "5055558891", city: "Albuquerque" },
  { name: "Owen", phone: "5205554316", city: "Tucson" },
];


//Step 2: CRUD Functions

//Add a new entry to the array
function addEntry(book,entry){//book: phone book array
    let len = 0;
    for (let i = 0; i < book.length; i++){//loops through every item in book
        len++;
    }
    book[len] = entry;
    return book;
}

//addEntry(phoneBook, {name: "Ava", phone: "5552223333", city: "Austin"});
//console.log(phoneBook);

//Find by name using a loop and update relevant fields
function updateEntry(book, name, newData) {
    for (let i = 0; i < book.length; i++) {//loop through each entry in the phone book
        if (book[i].name === name) {
            if (newData.name !== undefined) {
                book[i].name = newData.name; //set the entry's name to the new name
            }//end name update check

            if (newData.phone != undefined) {
                book[i].phone = newData.phone;//set the entry's phone name to the new phone
            }//end phone update check

            if (newData.city != undefined){
                book[i].city = newData.city; //set the entry's city to the new city
            }//end city update check
            return true;//find a name match
        }
    }
    return false; //no matching name was found
}

// let updated = updateEntry(phoneBook, "Owen", { city: "Beijing"});
// if (updated){
//     console.log("Update worked: ", phoneBook)
// }else {
//     console.log("Name not found");
// }


//Remove using splice and stop loop once found
function deleteEntry(book,name){
    for (let i =0; i< book.length; i++){
        if (book[i].name === name){//find matching name
            book.splice(i, 1);//remove one item at index i
            return true;//stop loop
        }
    }
    return false; //name not found
}

// const deleted = deleteEntry(phoneBook, "Owen");
// if (deleted){
//     console.log("Delete worked:", phoneBook);
// }else {
//     console.log("Name not found");
// }


//Step 3: Sorting Algorithms

//Bubble sort by name in ascending order: keep swapping neighbors and largest bubbles to the end
function bubbleSortByName(book){
    for (let i=0; i<book.length -1; i++){//number of passes
        for (let j =0; j < book.length -1 - i; j++){//inner loop compares adjacent entries
            //j is current position inside one pass
            if (book[j].name > book[j+1].name){//if current name is alphabetically greater than the next name, they are out of order
                let temp = book [j]; //save current objectt in a temporary variable
                book[j] = book[j+1];//move next object into current position
                book [j+1] = temp; //put saved object into the next position
            }//end of if block for swapping
        }//end inner loop for one pass of adjacent comparisons
    }//end outer loop after all passes
    return book;
}

// bubbleSortByName(phoneBook);
// console.log(phoneBook);


//Selection sort by phone: find the smallest number and place it at the beginning
function selectionSortByPhone(book){
    for (let i =0; i < book.length-1; i++){//current position where the next smallest phone should be placed
        let minIndex = i; //assume the current position i is the smallest phone in the unsorted section to start

        for(let j= i+1; j<book.length; j++){//inner loop scans the remaining unsorted entries to find a smaller phone number
            let currentPhone = Number(book[j].phone); //convert to a number
            let minPhone = Number(book[minIndex].phone);

            if (currentPhone < minPhone){
                minIndex = j;
            }
        }//end of inner loop after finding the minimum phone index in the unsorted section

        if (minIndex !== i){
            let temp = book[i];
            book [i] = book[minIndex];
            book[minIndex] = temp; 
        }
    }
    return book;
}

// selectionSortByPhone(phoneBook);
// console.log(phoneBook);


//Merge Sort By Name: merge sort splits the array into halves until size 1, then merges them back together in sorted order
function mergeSortByName(book){
    if (book.length <= 1){//base case: arrays with 0 or 1 item are already sorted
        return [...book];
    }

    let mid = Math.floor(book.length /2);
    let leftHalf = book.slice(0, mid);//stops before index mid
    let rightHalf = book.slice(mid); //slice from that index all the way to the end

    let sortedLeft = mergeSortByName(leftHalf); //recrusive
    let sortedRight = mergeSortByName (rightHalf);

    return mergeByName(sortedLeft, sortedRight); //merge two sorted halves into one sorted array
}

function mergeByName (left, right){//merge two already sorted arrays by name
    let merged = []; //store final merged result
    let i = 0; //left array
    let j =0; //right array

    while (i< left.length && j < right.length){
        if (left[i].name <= right [j].name){//if left name comes first alphabeticall
            merged.push(left[i]);//add left item to merged result
            i++; //move left pointer forward
        }else {//otherwise, right name comes first
            merged.push(right[j]);//add right item to merged result
            j++;//move right pointer forward
        }
    }

    while (i <left.length){//if left array still has remaining items
        merged.push(left[i]); //add remaining left item
        i++;
    }

    while (j<right.length){//if right array still has remaining items
        merged.push(right[j]);//add remaining right items
        j++;
    }

    return merged;
}

const sortedByName = mergeSortByName(phoneBook);
console.log(sortedByName);
console.log(phoneBook);

/*
start with mergeSortByName["D", "C"]{
sortedLeft = mergeSortByName(D) = D
sortedRight = mergeSortByName(C) = C
return mergeByName (D , C) = [C ,D]
}
*/
//mergeByName(C,D) = [C,D] = mergeSortByname(book)


/*
1) Which algorithm was easiest to implement?
Bubble sort was the easiest to implement because it uses simple nested loops and direct adjacent swaps.

2) Which one was hardest to understand?
Merge sort was the hardest to understand because it uses recursion, splitting into halves, and a separate merge step.

3) Which sorting algorithms modify the original array?
Bubble sort and selection sort modify the original array in-place.

4) Which algorithm returns a new array?
Merge sort returns a new sorted array and does not modify the original array.

5) What is the main structural difference between merge sort and the other two?
Bubble sort and selection sort are iterative (loop-based, in-place comparisons), while merge sort is divide-and-conquer:
it recursively splits the array, then combines sorted halves with a merge function.
*/
