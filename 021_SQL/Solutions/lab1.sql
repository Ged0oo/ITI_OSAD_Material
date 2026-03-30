
-- 1. Select the title, description, and length of all films that are longer than 120  minutes.
-- Sort them from the longest to the shortest

select title, description, length from film
where length > 120
order by length desc;



-- 2. Find all films that have a rental_rate of 0.99 or 2.99, but their 
-- replacement_cost is greater than 20.00

select * from film
where rental_rate in (0.99, 2.99)
and replacement_cost > 20 ;



-- 3. Count the total number of films available in each rating (G, PG, R, etc.)

select count(*), rating from film
group by rating




-- 4. List the customer_ids who have made more than 30 separate payments in the payment tableselect * from payment;

select customer_id from payment
group by customer_id
having COUNT(*) > 30;




-- 5. Get all "Cities" in the database and the "Country" they belong to, but only for cities located in 'Egypt'

select * from city
where country_id = (select country_id from country where country = "Egypt");




-- 6. Display a list of all films and the names of the actors who starred in them. 
-- (show film id, title and actor name)

select f.film_id, f.title, a.first_name, a.last_name
from film f join film_actor fa on f.film_id = fa.film_id
join actor a on fa.actor_id = a.actor_id
order by f.film_id;






-- 7. Find all customers who have rented a movie (but haven't returned it yet.) 
-- (show the customer name and the film title).film

select c.first_name, c.last_name, f.title
from customer c 
join rental r on c.customer_id = r.customer_id
join inventory i on r.inventory_id = i.inventory_id
join film f ON i.film_id = f.film_id
where r.return_date is null;






-- 8. List the titles of all films whose length is greater than the average length of 
-- all films in the database.

select title from film
where length > (select avg(length) from film);






-- 9. Write a query to find the first_name, last_name, and email of customers who 
-- have zero rental records

select c.first_name, c.last_name, c.email from customer c
left join rental r on c.customer_id = r.customer_id
where c.customer_id is null;





-- 10.Create a view named my_custome. This view should display each 
-- customer's name, their total number of rentals, and the total amount of money they have paid.

create view my_custome as
select c.customer_id, CONCAT(c.first_name, ' ', c.last_name) as customer_name,
    count(distinct r.rental_id) as total_rentals,
    ifnull(sum(p.amount), 0) as total_spent
from customer c left join rental r on c.customer_id = r.customer_id
left join payment p on c.customer_id = p.customer_id
group by c.customer_id, customer_name;

select * from my_custome;





-- 11.Use the previous view to find only customers who spent more than $100

select * from my_custome c
where c.total_spent > 100;








-- ---------------------------------------------------------------------
-- ------------------------- Built-in Function -------------------------
-- ---------------------------------------------------------------------

-- 1. Display actor names in the format: LAST_NAME, First_name (e.g., GUINESS, Penelope).

select concat(first_name, ", ", last_name) as name from actor;





-- 2. Display all customer emails in lowercase and replace the domain 
-- @sakilacustomer.org with @iti-students.edu.

select lower( replace (email, '@sakilacustomer.org', '@iti-students.edu')) as email
from customer;






-- 3. Display the first 50 characters of each film's description followed by "..." 
-- and call the column short_summary.

select CONCAT(left (description, 50), '...') as summ from film;




-- 4. Find all customers who registered in the month of February (any year).

select first_name, last_name, email, create_date
from customer
where month(create_date) = 2;











-- ---------------------------------------------------------------------
-- ----------------------- User-Defined Function -----------------------
-- ---------------------------------------------------------------------



-- 1. Create a function that takes actor_id and returns the concatenated first and last name of 
-- this actor.

DELIMITER /

create function get_actor_name(fun_actor_id int)
returns varchar(100)
deterministic
begin
	declare full_name varchar(100);
    
    select concat(first_name, ' ', last_name) into full_name
	from actor where actor_id = fun_actor_id;
    
    return full_name;
end /

DELIMITER ;

select get_actor_name(1);






-- 2. Create a function that takes customer_id and returns the total count of rentals made by this customer

DELIMITER //

CREATE FUNCTION get_customer_rentals(c_id INT)
RETURNS INT
DETERMINISTIC
READS SQL DATA
BEGIN
    DECLARE rental_count INT;

    SELECT COUNT(*)
    INTO rental_count
    FROM rental
    WHERE customer_id = c_id;

    RETURN rental_count;
END //

DELIMITER ;

SELECT get_customer_rentals(1);



-- 3. Create a function that takes a DECIMAL value and returns it as a formatted string with 
-- a dollar sign (e.g., $19.99)

DELIMITER //

CREATE FUNCTION format_dollar(amount DECIMAL(10,2))
RETURNS VARCHAR(20)
DETERMINISTIC
BEGIN
    RETURN CONCAT('$', FORMAT(amount, 2));
END //

DELIMITER ;

SELECT format_dollar(19.99);