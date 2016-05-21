// https://astexplorer.net/#/3qfKe0vrRn/3

const prevName = 'SUCCESS';
const nextName = 'AWESOME';
const prevFilePath = '../../constants';
const nextFilePath = '../../constants/status';

export default function transformer(file, {jscodeshift: j}) {
  const root = j(file.source);

  const renameIdentifier = newName => path => {
    j(path).replaceWith(() => j.identifier(newName));
  };

  const renameLiteral = newName => path => {
    j(path).replaceWith(() => j.literal(newName));
  };

  // import {RENAME_THIS as no} from './example';
  // UNUSED
  root
    .find(j.ImportDeclaration)
    .find(j.ImportSpecifier)
    .find(j.Identifier, {name: prevName})
    .forEach(renameIdentifier(nextName));

  // import RENAME_THIS from './example';
  // UNUSED
  root
    .find(j.ImportDeclaration)
    .find(j.ImportDefaultSpecifier)
    .find(j.Identifier, {name: prevName})
    .forEach(renameIdentifier(nextName));

  // imports, expressions, variables
  // too liberal with renaming -- needs to change variables coming from import declarations
  root
    .find(j.Identifier, {name: prevName})
    .forEach(renameIdentifier(nextName));

  // import {example as no} from './RENAME_THIS';
  root
    .find(j.ImportDeclaration)
    .find(j.Literal, {value: prevFilePath})
    .forEach(renameLiteral(nextFilePath));

  // const example = requrire('./RENAME_THIS');
  root
    .find(j.VariableDeclarator, {
      id: {type: 'Identifier'},
      init: {callee: {name: 'require'}},
    })
    .find(j.Literal)
    .forEach(renameLiteral(nextFilePath));

  return root.toSource();
}
