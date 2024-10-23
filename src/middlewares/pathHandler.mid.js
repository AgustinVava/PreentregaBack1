function pathHandler (req, res, next){
console.error(`${req.method} ${req.url} path not found`);
return res.status(404).json({ 
  message: `${req.method} ${req.url} path not found`, 
});

}

export default pathHandler;