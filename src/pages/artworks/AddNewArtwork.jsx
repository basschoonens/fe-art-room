import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const AddNewArtwork = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [artworkType, setArtworkType] = React.useState('');


    const onSubmit = async (data) => {
        setLoading(true);
        setError(null);

        const jwt = localStorage.getItem('jwt');
        const abortController = new AbortController();

        const headers = {
            "Content-Type": 'multipart/form-data',
            "Authorization": `Bearer ${jwt}`
        };

        try {
            console.log('Making POST request to add artwork with image...');

            const formData = new FormData();
            formData.append('artworkType', artworkType);
            Object.entries(data).forEach(([key, value]) => {
                if (key !== 'file') {
                    formData.append(key, value);
                }
            });
            formData.append('file', data.file[0]);

            const artworkResponse = await axios.post('http://localhost:8080/artworks/user', formData, {
                signal: abortController.signal,
                headers });

            console.log('Artwork POST request complete.');
            console.log('Response:', artworkResponse);
        } catch (error) {
            setError(error);
            console.error('Error uploading artwork:', error.response ? error.response.data : error.message);
        }
        setLoading(false);
        return () => {
            abortController.abort();
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Title</label>
                <input type="text" {...register('title', { required: true })} />
                {errors.title && <span>Title is required</span>}
            </div>
            <div>
                <label>Artist</label>
                <input type="text" {...register('artist')} />
            </div>
            <div>
                <label>Description</label>
                <textarea {...register('description', { required: true })}></textarea>
                {errors.description && <span>Description is required</span>}
            </div>
            <div>
                <label>Date Created</label>
                <input type="date" {...register('dateCreated')} />
            </div>
            <div>
                <label>Gallery Buying Price</label>
                <input type="number" {...register('galleryBuyingPrice')} />
            </div>
            <div>
                <label>Edition</label>
                <input type="text" {...register('edition')} />
            </div>
            <div>
                <label>Artwork Type</label>
                <div>
                    <label>
                        <input type="radio" value="drawing" checked={artworkType === 'drawing'} onChange={() => setArtworkType('drawing')} />
                        Drawing
                    </label>
                    <label>
                        <input type="radio" value="painting" checked={artworkType === 'painting'} onChange={() => setArtworkType('painting')} />
                        Painting
                    </label>
                </div>
            </div>
            {artworkType === 'drawing' && (
                <>
                    <div>
                        <label>Drawing Draw Type</label>
                        <input type="text" {...register('drawingDrawType')} />
                    </div>
                    <div>
                        <label>Drawing Surface</label>
                        <input type="text" {...register('drawingSurface')} />
                    </div>
                    <div>
                        <label>Drawing Material</label>
                        <input type="text" {...register('drawingMaterial')} />
                    </div>
                    <div>
                        <label>Drawing Dimensions Width (cm)</label>
                        <input type="number" {...register('drawingDimensionsWidthInCm')} />
                    </div>
                    <div>
                        <label>Drawing Dimensions Height (cm)</label>
                        <input type="number" {...register('drawingDimensionsHeightInCm')} />
                    </div>
                </>
            )}
            {artworkType === 'painting' && (
                <>
                    <div>
                        <label>Painting Paint Type</label>
                        <input type="text" {...register('paintingPaintType')} />
                    </div>
                    <div>
                        <label>Painting Surface</label>
                        <input type="text" {...register('paintingSurface')} />
                    </div>
                    <div>
                        <label>Painting Material</label>
                        <input type="text" {...register('paintingMaterial')} />
                    </div>
                    <div>
                        <label>Painting Dimensions Width (cm)</label>
                        <input type="number" {...register('paintingDimensionsWidthInCm')} />
                    </div>
                    <div>
                        <label>Painting Dimensions Height (cm)</label>
                        <input type="number" {...register('paintingDimensionsHeightInCm')} />
                    </div>
                </>
            )}
            <div>
                <label>Image</label>
                <input type="file" {...register('file', { required: true })} />
                {errors.file && <span>Image is required</span>}
            </div>
            <button type="submit">Add Artwork</button>
        </form>
    );
};

export default AddNewArtwork;