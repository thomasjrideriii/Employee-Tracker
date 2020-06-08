USE employee_tracker_db;

INSERT INTO department(name) VALUES ("Marketing");
INSERT INTO department(name) VALUES ("Development");
INSERT INTO department(name) VALUES ("Quality Assurance");
INSERT INTO department(name) VALUES ("Legal");

INSERT INTO role(title, salary, department_id) VALUES ("Marketing Lead", 135000.00, 1);
INSERT INTO role(title, salary, department_id) VALUES ("Marketing Analyst", 85000.00, 1);
INSERT INTO role(title, salary, department_id) VALUES ("Lead Engineer", 150000.00, 2);
INSERT INTO role(title, salary, department_id) VALUES ("Engineer", 95000.00, 2);
INSERT INTO role(title, salary, department_id) VALUES ("QA Lead", 100000.00, 3);
INSERT INTO role(title, salary, department_id) VALUES ("QA Tester", 75000.00, 3);
INSERT INTO role(title, salary, department_id) VALUES ("Legal Team Lead", 225000.00, 4);
INSERT INTO role(title, salary, department_id) VALUES ("Lawyer", 175000.00, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Paul", "Atreides", 1, null);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Ellen", "Ripley", 3, null);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Andrew", "Wiggen", 5, null);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Jennifer", "Walters", 7, null);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Spock", null, 2, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Malcom", "Reynolds", 2, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Emmet", "Brown", 4, 2);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Thomas", "Anderson", 4, 2);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Sarah", "Conner", 6, 3);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Richard", "Deckard", 6, 3);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Matthew", "Murdock", 8, 4);