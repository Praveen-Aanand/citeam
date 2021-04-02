import React from 'react';
import Drawer from '../components/drawer';
import firebase from "firebase";
import { List , ListItem,ListItemSecondaryAction,ListItemText, IconButton, ListItemAvatar, Button} from "@material-ui/core"; 
import Delete from '@material-ui/icons/DeleteRounded';
import AddShort from '../components/AddShort';
export default class ShortCode extends React.Component{
    constructor(props){
        super(props)
        this.state={
            list:null,
            listBackUp:null,
            isChanged:false
        }
    }
    componentDidMount(){
         firebase.firestore().collection('config').doc("shortcode").onSnapshot((data)=>{
            console.log(data.data());
            this.setState({list:data.data()?.list,listBackUp:data.data()?.list})
        })
    }
   
    UploadNew=()=>{
        firebase.firestore().collection('config').doc('shortcode').update({
            list:this.state.list
        }).then(()=>{
            console.log('updated')
            this.setState({isChanged:false})
        })
    }

    render(){
        return(
            <div>
                 <Drawer />
                 <small>Total Short Codes {this.state?.listBackUp?.length}</small>
                <List>
                 {this.state.list ? <div>{this.state?.list.map((data,index)=>{
                     return <ListItem>
                         <ListItemAvatar>
                             {index+1}
                         </ListItemAvatar>
                         <ListItemText key={index}
                    primary={data?.code}
                    secondary={[
                    `Branch : ${data?.branch}`,<br/>,
                ]}
                    
                  />
                  <ListItemSecondaryAction>
                      <IconButton aria-label="delete" onClick={()=>{
                        //   console.log(index)
                        //   if(index==0){
                        //     var temp = this.state?.list.splice(index,1);
                        //   } else{
                        //     var temp = this.state?.list.splice(index,1);
                        //   }  
                        //   this.setState({list:temp,isChanged:true})
                        var temp = this.state.list;
                        var index= temp.indexOf(data);
                        console.log(temp.indexOf(data))
                        if (index > -1) {
                            temp.splice(index, 1);
                        }
                        this.setState({list:temp,isChanged:true})
                      }}>
                        <Delete/>
                      </IconButton> 
                  </ListItemSecondaryAction>
                  </ListItem>
                 })}
                 </div>:<p>Loading...</p>}
                 
              {this.state.isChanged?<div style={{position:'fixed',bottom:'0px',padding:'10px'}} align="right">
                  <Button style={{backgroundColor:'#1a73e8',color:'white',marginRight:'5px'}} onClick={()=>this.UploadNew()}>
                      Save
                  </Button>
                  <Button style={{color:'orangered'}} onClick={()=>{
                      this.setState({list:this.state.listBackUp,isChanged:false})
                  }}>
                      Cancle
                  </Button>
              </div>:
              <div style={{position:'fixed',bottom:'0px',padding:'10px'}}>
                  <AddShort listData={this.state.list}/>
              </div>
              }
              </List>
            </div>
        )
    }
} 