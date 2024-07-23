#

Rinda Fajar Triana
BackEnd Developer

## Jawaban

1. FizzBuzz = npm run start-fizzbuzz
   Polindrome = npm run start-palindrome

2. // (a)
   SELECT a.customerNumber
   FROM customers a
   LEFT JOIN orders b ON a.customerNumber = b.customerNumber
   LEFT JOIN orderdetails c ON b.orderNumber = c.orderNumber
   LEFT JOIN products d ON c.productCode = d.productCode
   WHERE d.productLine = 'Classic Cars'
   GROUP BY a.customerNumber
   HAVING COUNT(d.productLine) > 23;

3. (b)
   CREATE TABLE IF NOT EXISTS kurs_pajak (
   id_ksm_kurs_pajak INT,
   kurs_rate DECIMAL(10, 4),
   tgl DATE,
   curr_id INT
   );

DELIMITER //

CREATE PROCEDURE extract_kurs_pajak()
BEGIN
DECLARE EXIT HANDLER FOR SQLEXCEPTION
BEGIN
ROLLBACK;
END;

    START TRANSACTION;

    IF (SELECT COUNT(*) FROM kurs_pajak) > 0 THEN
        ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'The table kurs_pajak already has data.';
    ELSE
        INSERT INTO kurs_pajak (id_ksm_kurs_pajak, kurs_rate, tgl, curr_id)
        SELECT
            id,
            kurs_rate,
            start_date,
            curr_id
        FROM ksm_kurs_pajak;

        COMMIT;
    END IF;

END //

DELIMITER ;

CALL extract_kurs_pajak();

(c)
DELIMITER $$

CREATE FUNCTION classicmodels.find_min_date(dates VARCHAR(255))
RETURNS DATE
READS SQL DATA
BEGIN
DECLARE min_date DATE;
DECLARE curr_date_str VARCHAR(255);
DECLARE curr_date DATE;
DECLARE comma_position INT;
DECLARE dates_empty INT DEFAULT 0;

    SET min_date = '9999-12-31';

    WHILE dates_empty = 0 DO
        SET comma_position = LOCATE(',', dates);

        IF comma_position = 0 THEN
            SET curr_date_str = dates;
            SET dates_empty = 1;
        ELSE
            SET curr_date_str = SUBSTRING(dates, 1, comma_position - 1);
            SET dates = SUBSTRING(dates, comma_position + 1);
        END IF;

        SET curr_date = STR_TO_DATE(curr_date_str, '%Y-%m-%d');

        IF curr_date < min_date THEN
            SET min_date = curr_date;
        END IF;
    END WHILE;

    RETURN min_date;

END$$

DELIMITER ;

SELECT find_min_date('2016-04-22, 2016-07-20, 2015-03-29, 2023-07-03') AS min_date;

//add
