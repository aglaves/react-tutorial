import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Create = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('mario');
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = {title, body, author};

        setIsPending(true);
        fetch('http://localhost:8000/blogs', {
            method: 'post',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(blog)
        }).then(() => {
            console.log('Added new blog entry');
            setIsPending(false);
            history.push('/');
        });
    }
    return ( 
        <div className="create">
            <h2>Add a new blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog title:</label>
                <input type="text" required="required" value={title} onChange={(e) => setTitle(e.target.value)} />
                <label>Blog body:</label>
                <textarea required="required" value={body} onChange={(e) => setBody(e.target.value)}></textarea>
                <label>Blog author:</label>
                <select value={author} onChange={(e)=>setAuthor(e.target.value)}>
                    <option value="mario">Mario</option>
                    <option value="yoshi">Yoshi</option>
                </select>
                {!isPending && <button>Add Blog</button>}
                {isPending && <button disabled='true'>Loading...</button>}
            </form>
        </div>
     );
}
 
export default Create;