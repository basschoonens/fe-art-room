import {useState} from "react";
import axios from "axios";

export default function MainGallery() {

    const [artwork, setArtwork] = useState([]);
    const [imageData, setImageData] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function fetchArtworks() {
        try {
            const response = await axios.get('http://localhost:8080/artworks');
            setArtwork(response.data);
            console.log(response.data);
        } catch (e) {
            console.error(e);
        }
    }

    async function fetchImageData(id) {
        setError(null);

        try {
            setLoading(true);
            const download = await axios.get(`http://localhost:8080/artworks/${id}/image`, {
                responseType: 'arraybuffer'
            });
            const blob = new Blob([download.data], {type: 'image/png'});
            const dataUrl = URL.createObjectURL(blob);
            setImageData(dataUrl);
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="page-container">
                <h1>Main Gallery</h1>
                <button onClick={fetchArtworks}>See all artworks</button>
            </div>
            <div>
                {artwork.map(art => (
                    <div key={art.id}>
                        <h2>{art.title}</h2>
                        <p>{art.description}</p>
                        <p>{art.artist}</p>
                        <p>{art.dateCreated}</p>
                        {art.image && <img src={`http://localhost:8080/artworks/${art.id}/image`}
                                           alt="artwork"
                                           onClick={() => fetchImageData(art.id)}
                        />}
                        {loading && <p>Loading...</p>}
                        {error && <p>{error.message}</p>}
                    </div>
                ))}
            </div>
        </>
    )
}
