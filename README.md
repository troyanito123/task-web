# Task App

Aplicación web de gestión de tareas construida con **Angular 20** y **Angular Material**.

## Características

- Login de usuario por email (sin contraseña, modo demo).
- Gestión de tareas: crear, editar, eliminar, marcar como completadas.
- Interfaz moderna y responsiva usando Angular Material.
- Componentes desacoplados: formulario y tabla de tareas reutilizables.
- Pruebas unitarias listas para Angular zoneless.
- Despliegue fácil en Firebase Hosting.

## Instalación

```bash
git clone https://github.com/troyanito123/task-web.git
cd task-app
npm install
```

## Scripts útiles

- `npm start` — Inicia la app en modo desarrollo.
- `npm run build:prod` — Compila la app para producción.
- `npm test` — Ejecuta las pruebas unitarias.
- `firebase deploy --only hosting` — Despliega la app en Firebase Hosting.

## Estructura principal

- `src/app/authentication` — Módulo de autenticación y login.
- `src/app/task` — Módulo de tareas (formulario, tabla, lógica).
- `src/app/shared` — Componentes y utilidades compartidas.
- `src/environments` — Configuración de entornos.

## Tecnologías

- Angular 20+
- Angular Material
- RxJS
- SCSS

## Pruebas

El proyecto está configurado para pruebas unitarias con Jasmine/Karma y soporta Angular zoneless.  
Puedes ejecutar pruebas de un solo archivo así:

```bash
ng test --include=src/app/authentication/presentation/login/login.spec.ts --watch=false
```

## Despliegue

El proyecto está listo para ser desplegado en Firebase Hosting.  
Asegúrate de tener la CLI de Firebase instalada y autenticada.

```bash
firebase deploy --only hosting
```
