import React, { Component } from "react";
import "./UsersSearch.scss";

class UsersSearch extends Component {

    constructor(props){
        super(props);

        this.state = {
            search: '',
            result: [],
            error: ''
        }

    }

    renderItems = () => {
        
        let mapRows;
    if(this.state.result.length !== 0){
        mapRows = this.state.result.map((item, index) => (
            <ul key={index}>
                <li>
                    {/* Passing unique value to 'key' prop, eases process for virtual DOM to remove specific element and update HTML tree  */}
                    <span><strong>FullName : </strong>{item.fullName}</span>
                    <span><strong>Email : </strong>{item.email}</span>
                    <span><strong>Address : </strong>{item.address}</span>
                </li>
            </ul>
        ));
        
    }else{
        mapRows = <span>{this.state.error}</span>;
    }
    
    return mapRows;

    };


    handleSearch = (e) => {
        this.setState({search : e.target.value});
}

    searchUsers = (e) => {
        e.preventDefault();
      
        let data = sessionStorage.getItem("mySessionStorage");
        data = JSON.parse(data);

        this.setState({result : []});

        if(this.state.search !== '')
        {
            if (data.filter((em) => 
            em.fullName === this.state.search 
            || em.email === this.state.search 
            || em.address === this.state.search).length !== 0)
            {
                this.setState({result : data.filter((em) => 
                    em.fullName === this.state.search 
                    || em.email === this.state.search 
                    || em.address === this.state.search)
                            });
                
            }else{
                this.setState({error : 'No Users to search.'});
            }   
        }else{
            this.setState({error : 'No Users to search.'});
        }
     
    }
    
    render (){
        
        return (
            <div className="search-page">
                <h1>Search page</h1>
                <form onSubmit={this.searchUsers}>
                <input type="text" name="search" placeholder="Search users..." onChange={this.handleSearch}/>
                <button>Search</button>
                </form>
                <div>
                <label>List of users :</label>
                {this.renderItems()}
                </div>
            </div>
        )
        
    }
}

export default UsersSearch;