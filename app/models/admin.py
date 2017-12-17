from graphene import ObjectType, String

class Admin(ObjectType):
	def __init__(self, login, password):
		if login == 'admin' and password == '1234':
			self.ok = True
		else:
			self.ok = False

	auth = String()

	def resolve_auth(self, args, context, info):
		if self.ok:
			return 'ok'
		else:
			return 'error'