INSERT INTO department (name)
VALUES ("Sales"),
    ("Marketing"),
    ("Finance"),
    ("Customer Support"),
    ("IT"),
    ("Contractor");

INSERT INTO `position` (title, salary, department_id)
VALUES ("CEO", 150000, 1),
    ("Mktg Head", 177600, 2),
    ("Chief Fin Officer", 77700, 3),
    ("Customer Success Manager", 77700, 4),
    ("Network Engineer", 100000, 5),
    ("Data Scientist", 120000, 5);

INSERT INTO hired (first_name, last_name, position_id, manager_id)
VALUES ("Rob","Downey",1,NULL),
    ("Chris","Evans",2,1),
    ("Chris","Hemsworth",3,2),
    ("Scar","Johansen",4,3),
    ("Sam","Jackson",5,4),
    ("Mark","Ruffalo",6,5);     
