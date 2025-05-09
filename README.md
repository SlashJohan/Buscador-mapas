# 🗺️ Buscador de Ubicaciones con React + Next.js + Leaflet

Este proyecto es parte de una prueba técnica Full Stack. Permite al usuario buscar lugares usando texto o seleccionarlos directamente en un mapa interactivo. Al hacer clic en un resultado o en el mapa, el marcador se actualiza y se sincroniza con el campo de búsqueda.

---

## 🚀 Tecnologías utilizadas

- ✅ **React 19** + **Next.js 15**
- ✅ **Leaflet** y **React Leaflet** para mapas interactivos
- ✅ **Tailwind CSS 4** para estilos
- ✅ **OpenStreetMap Nominatim API** para búsqueda y geolocalización inversa

---

## ⚙️ Instrucciones de instalación

1. Clona este repositorio:

```bash
git clone https://github.com/SlashJohan/Buscador-mapas.git
cd Buscador-mapas


🔑 API y configuración
No se requiere clave de API.

La aplicación usa la API pública de Nominatim para búsquedas y reverse geocoding.

Se recomienda añadir un header User-Agent válido (como un correo electrónico) para cumplir con la política de uso.

📌 Decisiones técnicas
Se eligió Leaflet en lugar de Google Maps para evitar la dependencia de claves API y facilitar la configuración.

Se usó Tailwind CSS para rapidez de maquetado, legibilidad y estilo responsive.

Se implementó useMap, flyTo y sincronización con geolocalización nativa.

📉 Limitaciones actuales
No se completó la parte Back-End con AWS por limitaciones en la verificación de la cuenta.

No hay persistencia de datos (no se guardan búsquedas ni ubicaciones).

No hay manejo avanzado de errores o carga (por ejemplo, fallos en la geolocalización).

💡 Posibles mejoras
Integrar AWS Amplify + Lambda + DynamoDB para almacenar favoritos.

Mostrar historial de búsquedas recientes.

Filtrar resultados por tipo de lugar (parques, hospitales, restaurantes).

Añadir pruebas automatizadas (unitarias y de integración).


👨‍💻 Autor
Johan Alberto Domínguez Acosta
📍 Bogota, Colombia
📧 johanalbertodominguezacosta@gmail.com