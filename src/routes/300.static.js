import Express from 'express';
const wwwPath = process.env.www || 'www';
export default Express.static(wwwPath);
