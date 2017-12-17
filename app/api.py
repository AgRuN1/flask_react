from graphene import ObjectType, String, Schema, Field
from flask_graphql import GraphQLView
from flask import session 

from models.admin import Admin

class Query(ObjectType):
    admin = Field(
        Admin,
        login=String(required=True), 
        password=String(required=True)
    )

    def resolve_admin(self, args, context, info):
        login = args.get('login')
        password = args.get('password')

        return Admin(login, password)


api_func = GraphQLView.as_view('graphql', schema=Schema(query=Query))