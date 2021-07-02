const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/FormDatabase?readPreference=primary&appname=MongoDB%20Compass&ssl=false',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>{console.log(`connection success`);
}).catch((e)=>{console.log('no connection');
})
