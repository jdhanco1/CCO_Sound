
const fs = require('fs');
const path = require('path');

const cmsRoot = path.join(__dirname, 'cms');
const srcApi = path.join(cmsRoot, 'src', 'api');
const srcComponents = path.join(cmsRoot, 'src', 'components');

// Ensure directories exist
if (!fs.existsSync(srcApi)) fs.mkdirSync(srcApi, { recursive: true });
if (!fs.existsSync(srcComponents)) fs.mkdirSync(srcComponents, { recursive: true });

// Move Components
const oldComponentsDir = path.join(cmsRoot, 'components');
if (fs.existsSync(oldComponentsDir)) {
  console.log('Moving components...');
  const categories = fs.readdirSync(oldComponentsDir);
  categories.forEach(category => {
    const catPath = path.join(oldComponentsDir, category);
    if (fs.statSync(catPath).isDirectory()) {
      const destCatPath = path.join(srcComponents, category);
        if (!fs.existsSync(destCatPath)) fs.mkdirSync(destCatPath, { recursive: true });
      
      const files = fs.readdirSync(catPath);
      files.forEach(file => {
          if (file.endsWith('.json')) {
            const src = path.join(catPath, file);
            const dest = path.join(destCatPath, file);
            fs.copyFileSync(src, dest);
            console.log(`Moved component: ${category}/${file}`);
          }
      });
    }
  });
}

// Move Content Types
const oldContentTypesDir = path.join(cmsRoot, 'content-types');
if (fs.existsSync(oldContentTypesDir)) {
  console.log('Processing content types...');
  const files = fs.readdirSync(oldContentTypesDir);
  
  files.forEach(file => {
    if (file.endsWith('.json')) {
      const filePath = path.join(oldContentTypesDir, file);
      const schema = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      
      const singularName = schema.info.singularName || file.replace('.json', '');
      const pluralName = schema.info.pluralName || singularName + 's';
      const apiName = singularName; // Standard convention
      
      const apiDir = path.join(srcApi, apiName);
      const ctDir = path.join(apiDir, 'content-types', singularName);
      const controllersDir = path.join(apiDir, 'controllers');
      const routesDir = path.join(apiDir, 'routes');
      const servicesDir = path.join(apiDir, 'services');
      
      // Create directories
      fs.mkdirSync(ctDir, { recursive: true });
      fs.mkdirSync(controllersDir, { recursive: true });
      fs.mkdirSync(routesDir, { recursive: true });
      fs.mkdirSync(servicesDir, { recursive: true });
      
      // Write schema.json
      fs.writeFileSync(path.join(ctDir, 'schema.json'), JSON.stringify(schema, null, 2));
      console.log(`Created schema for ${singularName}`);
      
      // Write Controller (TypeScript)
      const controllerContent = `/**
 * ${singularName} controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::${apiName}.${singularName}');
`;
      fs.writeFileSync(path.join(controllersDir, `${singularName}.ts`), controllerContent);
      
      // Write Router (TypeScript)
      const routerContent = `/**
 * ${singularName} router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::${apiName}.${singularName}');
`;
      fs.writeFileSync(path.join(routesDir, `${singularName}.ts`), routerContent);

      // Write Service (TypeScript)
      const serviceContent = `/**
 * ${singularName} service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::${apiName}.${singularName}');
`;
      fs.writeFileSync(path.join(servicesDir, `${singularName}.ts`), serviceContent);
    }
  });
}

console.log('Validating structure reparation complete.');
