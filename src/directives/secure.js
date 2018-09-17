const { SchemaDirectiveVisitor } = require('apollo-server');
const { AuthenticationError } = require('apollo-server');

module.exports = class SecureDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve } = field;
    
    field.resolve = async function(obj, args, context, info) {
      const { user } = context;
      if (!user) throw new AuthenticationError('authentication is required');

      return resolve.apply(this, [obj, args, context, info]);
    };
  }
};
