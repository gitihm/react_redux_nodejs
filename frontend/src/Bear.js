import React, {Component} from 'react';
import {  store} from "./App";
import {connect} from "react-redux";
import {getBears,findBear,addBear,updateBear,deleteBear} from "./App"
import './App.css'
import { Jumbotron, Container,Button,Table   } from 'reactstrap';
import imgBear from './img/bear.jpg'

class Bear extends Component {
    state = {
        addstatus : false,
        removestatus : false,
        findstatus: false,
        findAllstatus : false,
        changestatus: false,
        bear_id:'',
        bear_name : '',
        bear_weight : '',
    }

    // componentDidMount = () => {
    //     this.props.getBears()
    // }
    handleChagne = (e) => {
        this.setState({ [e.target.name] : e.target.value });
    } 
    
    renderBear = () => {
        console.log(this.props.bears)
        
            return  this.props.bears.map( (bear,index) =>
                (
                    
                    <tr >
                        <td >{bear.id}</td>
                        <td >{bear.name}</td>
                        <td >{bear.weight}</td>
                        {/* <li key={index}> {bear.id} {bear.name} {bear.weight} </li> */}
                    </tr>
                    )
            )  
          
    }
    
    findBear = (bear_id) => async () => {
        if(bear_id){
            try {
                await store.dispatch(findBear(bear_id))
                if(this.props.bears.id !== undefined){
                    alert("หมีทีท่านต้องการคือ \nเลขประจำตัวหมี : "+this.props.bears.id +"\nชื่อหมี : "+this.props.bears.name+"\nน้ำหนัก : "+this.props.bears.weight)
                }else{
                    alert("ไม่มีหมีทีท่านต้องการ..") 
                }
               
            }catch (err){
                console.error(err);  
            }
        }
        else{
            alert("กรุณากรอกข้อมูลให้ครบถ้วน..")
        }
  
    }
    addBear = () => async () => {
        if(this.state.bear_name&&this.state.bear_weight){
            try {
                //onsole.log("HERE")
                let bear = {name: this.state.bear_name , weight:this.state.bear_weight}
                //console.log("bear ",bear)
                await store.dispatch(addBear(bear))
                alert('เพิ่มหมีเรียบร้อย...')
            } catch (error) {
                console.error(error);
            }
        }else{
            alert("กรุณากรอกข้อมูลให้ครบถ้วน..")
        }
    }
    updateBear = () => async () => {
        
        if(this.state.bear_id&&this.state.bear_name&&this.state.bear_weight){

            try {
                //console.log("HERE")
                let bear = {bear_id: this.state.bear_id , name: this.state.bear_name , weight:this.state.bear_weight}
                //console.log("bear ",bear)
                await store.dispatch(updateBear(bear))
                alert('แก้ไขหมีเรียบร้อย...')
            } catch (error) {
                console.error(error);
                alert('ไม่พบหมีที่ต้องการแก้ไข...')
            }
        }
        else{
            alert("กรุณากรอกข้อมูลให้ครบถ้วน..")
        }
    }
    deleteBear = (bear_id) => async () => {
        if(this.state.bear_id){
            try {
                //console.log("HERE")
                await store.dispatch(deleteBear(bear_id))
                alert('ลบหมีเรียบร้อย...')
            } catch (error) {
                console.error(error);
            }
        }
        else{
            alert("กรุณากรอกข้อมูลให้ครบถ้วน..")
        }
    }
    findBears  = () => async () => {
        try {
            //console.log("HERE")
            await store.dispatch(getBears())
            this.setState({findAllstatus : true})
        } catch (error) {
            console.error(error);
        }
        
    }
    render() {
        const  { addstatus, removestatus,findstatus,findAllstatus,changestatus } = this.state
        if(addstatus === false && removestatus === false && findstatus === false && findAllstatus === false && changestatus === false){
            return(
                <div className="App">
                <Container>
                    <Jumbotron>
                        <img src={imgBear}></img>
                        <h1 >บริษัทหมี จำกัดแห่งประเทศไทย</h1>
                        <button onClick={()=> {this.setState({addstatus : true}) }}>เพิ่มจำนวนหมี</button> {' '}
                        <button onClick={()=> {this.setState({removestatus : true}) }}>ลดจำนวนหมี</button> {' '}
                        <button onClick={()=> {this.setState({changestatus : true}) }}>แก้ไขข้อมูลหมี</button> {' '}
                        <button onClick={()=> {this.setState({findstatus : true}) }}>ข้อมูลหมี</button> {' '}
                        <button onClick={this.findBears()}>ข้อมูลหมีทั้งหมด</button> {' '}
                    </Jumbotron>
                </Container>
                </div>
            )
        }
        else if(addstatus && !removestatus && !findstatus&& !findAllstatus && !changestatus ){
            return (
                <div className="App">
                 <Container>
                 <h1 >เพิ่มหมี</h1>
                    <hr/>
                    <table align="center" >
                        <tbody>
                            <tr>
                                <td><h3 className="leftText"> ชื่อหมี :</h3></td>
                                <td><input name="bear_name" type="text" onChange={this.handleChagne}></input></td>
                            </tr>
                            <tr>
                                <td><h3 className="leftText">น้ำหนัก :</h3></td>
                                <td><input name="bear_weight" type="number" onChange={this.handleChagne}></input></td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <Button color="success" onClick={this.addBear()}>เพิ่มหมี</Button><br/><br/><br/>
                    <Button color="primary" onClick={()=> {this.setState({addstatus : false}) }}>กลับหน้าหลัก</Button>
                 </Container>
                </div>
            );
        }
        else if(!addstatus && removestatus && !findstatus&& !findAllstatus && !changestatus ){
            return (
                <div className="App">
                 <Container>
                 <h1 >ลดจำนวนหมี</h1>
                    <hr/>
                    <table align="center" >
                        <tbody>
                            <tr >
                                <td ><h3 className="leftText">เลขประจำตัวหมี :</h3></td>
                                <td><input name="bear_id" type="number" onChange={this.handleChagne}></input></td>
                            </tr>
                        </tbody>
                        
                    </table>
                    
                    <Button  color="success" onClick={this.deleteBear(this.state.bear_id)}>ฆ่าหมี</Button><br/><br/><br/>
                    <Button  color="primary" onClick={()=> {this.setState({removestatus : false}) }}>กลับหน้าหลัก</Button>

                 </Container>
                    
                </div>
            )
        }
        else if(!addstatus && !removestatus && findstatus&& !findAllstatus && !changestatus ){
            return (
                <div className="App">
                <Container>
                <h1 >ค้นหาข้อมูลหมี</h1>
                <hr/>
                <table align="center" >
                    <thead>
                        <tr >
                            <td ><h3 className="leftText">เลขประจำตัวหมี :</h3></td>
                            <td><input name="bear_id" type="number" onChange={this.handleChagne}></input></td>
                        </tr>
                    </thead>
                </table>
                
                <Button color="success" onClick={this.findBear(this.state.bear_id)}>ค้นหา</Button><br/><br/><br/>
                
                <Button color="primary" onClick={()=> {this.setState({findstatus : false,show : false}) }}>กลับหน้าหลัก</Button>
                </Container>
            </div>
            )
        }
        else if(!addstatus && !removestatus && !findstatus&& findAllstatus && !changestatus ){
            
            return (
                <div className="App">
                <Container>
                <h1 >ข้อมูลหมีทั้งหมด</h1>
                <Table>
                    <thead>
                    <tr>
                        <th>เลขประจำตัวหมี</th>
                        <th>ชื่อหมี</th>
                        <th>น้ำหนัก</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* <hr/>
                        <ul> */}
                            { this.renderBear()}
                        {/* </ul>
                    <hr/> */}
                    </tbody>
                </Table>
                    <Button color="primary" onClick={()=> { this.setState({findAllstatus : false}) }}>กลับหน้าหลัก</Button>

                </Container>
                    
                    
                    
                    
                </div>
            )
        }
        else if(!addstatus && !removestatus && !findstatus&& !findAllstatus && changestatus ){
            return (
                <div className="App">
                <Container>
                <h1 >แก้ไขข้อมูลหมี</h1>
                <hr/>
                <table align="center" >
                    <tbody>
                        <tr >
                            <td ><h3 className="leftText">เลขประจำตัวหมี :</h3></td>
                            <td><input name="bear_id" type="number" onChange={this.handleChagne}></input></td>
                        </tr>
                        <tr>
                            <td><h3 className="leftText">ชื่อหมี :</h3></td>
                            <td><input name="bear_name" type="text" onChange={this.handleChagne}></input></td>
                        </tr>
                        <tr>
                            <td><h3 className="leftText">น้ำหนัก :</h3></td>
                            <td><input name="bear_weight" type="number" onChange={this.handleChagne}></input></td>
                        </tr>
                    </tbody>
                </table>
                
                <Button color="success" onClick={this.updateBear()}>อัพเดทข้อมูลหมี</Button><br/><br/><br/>
                <Button color="primary" onClick={()=> {this.setState({changestatus : false}) }}>กลับหน้าหลัก</Button>
                </Container>
                
                
                
            </div>
            )
        }
       
    }
}


  
const mapStateToProps = (bears) => {
    return {
        bears:bears.bearsPass
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getBears:  () => store.dispatch(getBears()),
        findBear:  () => store.dispatch(findBear()),
        addBear:  () => store.dispatch(addBear()),
        updateBear:  () => store.dispatch(updateBear()),
        deleteBear :  () => store.dispatch(deleteBear()),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Bear);