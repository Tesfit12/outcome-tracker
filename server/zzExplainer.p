
0) YOU CAN NOT DELETE FROM LOGGER TABLE B/C {
    update or delete on table "logger" violates foreign key constraint "expense_owner_id_fkey" on table "expense"
  }

1) be sure you are connected to your DATABASE !

2) if u want to insert through terminal please use single cot '' in the VALUES!


3) IMPORTANT if you want to style className do not use the bootstrap classNames give your own className


4) So the date part should be the date string date part, no matter what the timezone is, right?
  If the date string is "2016-06-22T00:00:00+0800", it will save as 2016-06-22.
  If it is "2016-06-21T16:00:00.000Z", then it should be 2016-06-21


5))))))) to get a specific user record you need to have his ID to so when a USER logged in you need to create a TOKEN by the jwtfile.js then you are going-
to send it to the FRONT END by doing res.json(TOKEN) ----> then at the front end you can have full access to the users IDENTITY......!!!!!!!!!