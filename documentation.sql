GET /api/users
- Description: Retrieve a list of all users.
- Response Format: JSON array of user objects.

Example Response:
[
  {
    "id": 1,
    "name": "John Doe",
    "gamertag": "johndoe123",
    "age": 25
  },
  {
    "id": 2,
    "name": "Alice Smith",
    "gamertag": "alicesmith456",
    "age": 30
  }
]

POST /api/users
- Description: Create a new user.
- Request Format: JSON object with properties 'name', 'gamertag', and 'age'.
- Response Format: JSON object with a success message and the created user object.

Example Request:
{
  "name": "Bob Johnson",
  "gamertag": "bobjohnson789",
  "age": 28
}

CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    gamertag VARCHAR(100) NOT NULL,
    age INT NOT NULL
);

CREATE PROCEDURE InsertUser (@name VARCHAR(100), @gamertag VARCHAR(100), @age INT)
AS
BEGIN
    BEGIN TRY
        INSERT INTO Users (name, gamertag, age) VALUES (@name, @gamertag, @age);
        PRINT 'User created successfully';
    END TRY
    BEGIN CATCH
        IF ERROR_MESSAGE() LIKE 'Invalid user data'
        BEGIN
            PRINT 'Error: Invalid user data';
            THROW 40001, 'Invalid user data', 1;
        END
    END CATCH;
END;

CREATE PROCEDURE DeleteUser (@userID INT)
AS
BEGIN
    BEGIN TRY
        IF NOT EXISTS (SELECT 1 FROM Users WHERE id = @userID)
        BEGIN
            PRINT 'Error: User not found';
            THROW 40401, 'User not found', 1;
        END

        DELETE FROM Users WHERE id = @userID;
        PRINT 'User deleted successfully';
    END TRY
    BEGIN CATCH
        IF ERROR_MESSAGE() LIKE 'Invalid user data'
        BEGIN
            PRINT 'Error: Invalid user data';
            THROW 40001, 'Invalid user data', 1;
        END
    END CATCH;
     BEGIN CATCH
        PRINT 'Error: ' + ERROR_MESSAGE();
        THROW;
    END CATCH;
END;

CREATE PROCEDURE GetUsers
AS
BEGIN
    BEGIN TRY
        SELECT * FROM Users;
    END TRY
    BEGIN CATCH
        PRINT 'Error: ' + ERROR_MESSAGE();
        THROW;
    END CATCH;
END;


