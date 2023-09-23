# Evolver Events Backend

## Authorization

The backend API implements user authorization to protect sensitive API operations from unauthorized access. Below are examples of how authorization is enforced:

### Ensure User Is Logged In

- **Endpoint**: `GET /api`
- **Unauthorized Response**:
```json
{
  "success": false,
  "error": {
    "type": "Unauthorized",
    "code": 401,
    "message": "You are not logged in"
  }
}


Event Operations

Endpoint: PUT /api/events/:eventId or DELETE /api/events/:eventId
-   **Unauthorized Response**:
```json
{
  "success": false,
  "error": {
    "type": "Unauthorized",
    "code": 401,
    "message": "You are not the creator of this event"
  }
}

Not Found Response:
```json
{
  "success": false,
  "error": {
    "type": "Not Found",
    "code": 404,
    "message": "Event doesn't exist"
  }
}

Group Operations
Endpoint: PUT /api/groups/:groupId or DELETE /api/groups/:groupId
Unauthorized Response:
```json
{
  "success": false,
  "error": {
    "type": "Unauthorized",
    "code": 401,
    "message": "You are not the creator of this group"
  }
}

Not Found Response:
```json
{
  "success": false,
  "error": {
    "type": "Not Found",
    "code": 404,
    "message": "Group doesn't exist"
  }
}

Group Member Operations
Endpoint: DELETE /api/groups/:groupId/members/:userId
Unauthorized Response:
```json
{
  "success": false,
  "error": {
    "type": "Unauthorized",
    "code": 401,
    "message": "You are not authorized to delete a user"
  }
}

Not Found Response:
```json
{
  "success": false,
  "error": {
    "type": "Not Found",
    "code": 404,
    "message": "Group doesn't exist"
  }
}

User Interests
Endpoints: DELETE /api/users/:userId/interests/:eventId or POST /api/users/:userId/interests/:eventId
Unauthorized Response:
```json
{
  "success": false,
  "error": {
    "type": "Unauthorized",
    "code": 401,
    "message": "You are not authorized to delete or add interests for others"
  }
}

User Likes
Endpoints: POST /api/comments/:commentId/likes/:userId or DELETE /api/comments/:commentId/likes/:userId
Unauthorized Response:
```json
{
  "success": false,
  "error": {
    "type": "Unauthorized",
    "code": 401,
    "message": "You are not authorized to add/remove another user's likes"
  }
}
