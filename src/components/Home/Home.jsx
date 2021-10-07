import Users from './Users/Users';
import './Home.css';
import Sales from './Sales/Sales';

const Home = () => {
    return (  
        <div>
            <Sales />
            <Users />
        </div>
    );
}
 
export default Home;