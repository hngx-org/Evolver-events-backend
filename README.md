# Evolver-events-backend

# Authorisation

The backend api has user authorisation implemented.
this implementation protects sensitive api operations from being carried out by any user
examples:

1.  Authorisation ensures a user is loggin before accessing the api
    ~ GET /api (when not logged in)
    Response:
    {
    "success": false,
    "error": {
    "type": "Unauthorized",
    "code": 401,
    "message": "You are not logged in"
    }
    }

2.  Authorisation ensures only the event creator can edit or delete an event
    ~ PUT /api/events/:eventId or DELETE /api/events/:eventId (when not creator)
    Response:
    {
    "success": false,
    "error": {
    "type": "Unauthorized",
    "code": 401,
    "message": "You are not the creator of this event"
    }
    }

    if event not found
    {
    "success": false,
    "error": {
    "type": "Not Found",
    "code": 404,
    "message": "Event doesnt exist"
    }
    }

3.  Authorisation ensures only the group creator can edit or delete a group
    ~ PUT /api/groups/:groupId or DELETE /api/groups/:groupId (when not creator)
    Response:
    {
    "success": false,
    "error": {
    "type": "Unauthorized",
    "code": 401,
    "message": "You are not the creator of this group"
    }
    }

    if group not found
    {
    "success": false,
    "error": {
    "type": "Not Found",
    "code": 404,
    "message": "Group doesnt exist"
    }
    }

4.  Authorisation ensures that only the user or the group creator can remove a user from the group
    ~ DELETE /api/groups/:groupId/members/:userId (if user is not userId or group creator)
    Response:
    {
    "success": false,
    "error": {
    "type": "Unauthorized",
    "code": 401,
    "message": "You are not authorised to delete a user"
    }
    }

    if group not found
    {
    "success": false,
    "error": {
    "type": "Not Found",
    "code": 404,
    "message": "Group doesnt exist"
    }
    }

5.  Authorisation ensures that uses cannot delete the interests of others
    ~ DELETE /api/users/:userId/interests/:eventId or POST /api/users/:userId/interests/:eventId (if another user)
    Response:
    {
    "success": false,
    "error": {
    "type": "Unauthorized",
    "code": 401,
    "message": "You are not authorised to delete or add interests for others"
    }
    }

6.  Authorisation ensures that uses cannot unlike for others
    ~ POST /api/comments/:commentId/likes/:userId or DELETE /api/comments/:commentId/likes/:userId (if another user)
    Response:
    {
    "success": false,
    "error": {
    "type": "Unauthorized",
    "code": 401,
    "message": "You are not authorised to add/remove another user's likes"
    }
    }
