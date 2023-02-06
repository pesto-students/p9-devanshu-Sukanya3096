/* Call method: Using call method we can do a function borrowing. We can borrow functions of some objects and use it with the data of some other objects. */

/* Apply method: Apply method is similar to call method. The first argument is the reference to the 'this' variable and for the second argument, unlike call, it takes an array of list of arguments which we have to pass to the function. */

/* Bind method: Bind method looks same as call method, the only difference is, instead of directly calling the method, the bind method binds the respective method (ex: booking) with the object (swiss/eurowing/lufthansa) and returns the copy of the method. */

const lufthansa = {
  airline: "Lufthansa",
  code: "LH",
  booking: function (flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.code}${flightNum}`
    );
  },
};

const eurowings = {
  airline: "Eurowings",
  code: "EW",
};

const swiss = {
  airline: "Swiss Airlines",
  code: "SX",
};

lufthansa.booking(236, "Sukanya");

//call method
lufthansa.booking.call(eurowings, 245, "Sneha");
//apply method
lufthansa.booking.apply(swiss, [500, "Runi"]);
//bind method
const book = lufthansa.booking;
const bookEW = book.bind(eurowings); //example 1
bookEW(345, "Samantha");
const bookSW = book.bind(swiss, 563); //example 2 -> to create a booking for a specific flight and specific airline
bookSW("Roger");
bookSW("John");
