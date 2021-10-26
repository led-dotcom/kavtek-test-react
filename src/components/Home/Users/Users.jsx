import './Users.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Users = () => {
    const [ data, setData ] = useState(null);
    const [ allData, setAllData ] = useState(null);
    const [ search, setSearch ] = useState('');
    const [ patternOne, setPatternOne ] = useState('');
    const [ patternTwo, setPatternTwo ] = useState('');
    const [ isSearch, setIsSearch ] = useState(false);

    const submitHandler = e => {
        e.preventDefault();
        if(search === ''){
            setIsSearch(false);
            setData(allData);
        }else if(search[0] === '@'){
            setIsSearch(true);
            setData(allData.filter(data =>data.city.match(patternTwo)));
        }
        else{
            setIsSearch(true);
            setData(allData.filter(data => 
                (data.name.match(patternOne) || new Date(data.createdAt.slice(0,-1)).toLocaleString('en-US').match(patternOne)) 
            ));
        }        
    }

    useEffect(() => {
        fetch('https://6155a05293e3550017b08b11.mockapi.io/users')
            .then(res => {
                return res.json();
            })
            .then(datas =>{
                setData(datas);
                setAllData(datas);
            })
    },[])

    useEffect(() => {
        const ContentsOne = Array.from(document.querySelectorAll('.content-one'));
        const ContentsTwo = Array.from(document.querySelectorAll('.content-two'));

        if(isSearch === true){
            if(search !== '' && search[0] !=='@'){
                ContentsOne.forEach(content => {
                    content.innerHTML = content.textContent.replace(patternOne, match => `<span style="background-color: AliceBlue; font-weight: bold; text; border-radius: 0.2em; padding: 0.1em">${match}</span>`);
                });
            }else if(search !== '' && search[0] ==='@'){
                ContentsTwo.forEach(content => {
                    content.innerHTML = content.textContent.replace(patternTwo, match => `<span style="background-color: AliceBlue; font-weight: bold; text; border-radius: 0.2em; padding: 0.1em">${match}</span>`);
                });
            };
        }else{
            ContentsOne.forEach(content => {
                content.innerHTML = content.textContent.replace(/<\/?span[^>]*>/g,'');
            });
            ContentsTwo.forEach(content => {
                content.innerHTML = content.textContent.replace(/<\/?span[^>]*>/g,'');
            });
        };        
    });

    return (  
        <div className="users">
            <form className="header" onSubmit={submitHandler}>                
                <h3>Users</h3>
                <input type="text" 
                value={search}                
                onChange={e => {
                    setSearch(e.target.value.replace(/[.*+?^${}()|[\]\\]/gi,"\\$&"));
                    if(e.target.value[0] !== '@'){                        
                        setPatternOne(new RegExp(`${e.target.value.replace(/[.*+?^${}()|[\]\\]/gi,"\\$&")}`, "gi"));
                    }else{
                        setPatternTwo(new RegExp(`${e.target.value.substr(1).replace(/[.*+?^${}()|[\]\\]/gi,"\\$&")}`, "gi"));
                    }                    
                }}
                placeholder="Search" />
            </form>
            {data ? 
            <div className="users-displayed">
                <div className="user-heading">
                    <div className="left">Full Name <i class="arrow down"></i></div>
                    <div className="mid">City <i class="arrow down"></i></div>
                    <div className="right">Date Registered <i class="arrow down"></i></div>
                </div>
                {data.map(oneData => (
                    <Link to={`/users/${oneData.id}`} className="one-user" key={oneData.id}>
                        <div className="left content-one">{oneData.name}</div>
                        <div className="mid content-two">{oneData.city}</div>
                        <div className="right content-one">{new Date(oneData.createdAt.slice(0,-1)).toLocaleString('en-US')}</div>
                    </Link>
                ))}
            </div> :
            <div>Trying to access the data...</div>
            }
        </div>
    );
}
 
export default Users;