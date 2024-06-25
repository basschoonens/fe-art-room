import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUpload} from '@fortawesome/free-solid-svg-icons';
import Button from '../../../components/button/Button.jsx';
import styles from './EditArtwork.module.css';
import {validateFile} from "../../../helpers/fileValidation.js"; // Adjust path to your CSS module

const EditArtwork = () => {
    const {id} = useParams(); // Get artworkId from URL params
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}, setValue} = useForm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [artworkData, setArtworkData] = useState(null);
    const [artworkType, setArtworkType] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [currentImageUrl, setCurrentImageUrl] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    useEffect(() => {
        // Fetch artwork data by artworkId
        const fetchArtwork = async () => {
            setLoading(true);
            try {
                const jwt = localStorage.getItem('jwt');
                const response = await axios.get(`http://localhost:8080/artworks/artist/${id}`, {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                        "Content-Type": "application/json"
                    }
                });
                setArtworkData(response.data);
                setArtworkType(response.data.artworkType);
                setValue('title', response.data.title);
                setValue('artist', response.data.artist);
                setValue('description', response.data.description);
                setValue('dateCreated', response.data.dateCreated);
                setValue('galleryBuyingPrice', response.data.galleryBuyingPrice);
                setValue('edition', response.data.edition);
                if (response.data.artworkType === 'drawing') {
                    setValue('drawingSurface', response.data.drawingData.drawingSurface);
                    setValue('drawingMaterial', response.data.drawingData.drawingMaterial);
                    setValue('drawingDimensionsWidthInCm', response.data.drawingData.drawingDimensionsWidthInCm);
                    setValue('drawingDimensionsHeightInCm', response.data.drawingData.drawingDimensionsHeightInCm);
                } else if (response.data.artworkType === 'painting') {
                    setValue('paintingSurface', response.data.paintingData.paintingSurface);
                    setValue('paintingMaterial', response.data.paintingData.paintingMaterial);
                    setValue('paintingDimensionsWidthInCm', response.data.paintingData.paintingDimensionsWidthInCm);
                    setValue('paintingDimensionsHeightInCm', response.data.paintingData.paintingDimensionsHeightInCm);
                }
                setCurrentImageUrl(`http://localhost:8080/artworks/${id}/image`);
            } catch (error) {
                setError('Failed to fetch artwork data. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchArtwork();
    }, [id, setValue]);

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && validateFile(file)) {
            setSelectedFile(file);
            // Generate preview URL
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        } else {
            setSelectedFile(null);
            setPreviewUrl(null);
            e.target.value = '';
        }
    };

    const submitEditedArtwork = async (data) => {
        setLoading(true);
        setError(null);
        const jwt = localStorage.getItem('jwt');

        try {
            // Update artwork data
            const updatedData = {
                title: data.title,
                artist: data.artist,
                description: data.description,
                dateCreated: data.dateCreated,
                galleryBuyingPrice: data.galleryBuyingPrice,
                edition: data.edition,
                artworkType: artworkType,
                drawingSurface: data.drawingSurface || undefined,
                drawingMaterial: data.drawingMaterial || undefined,
                drawingDimensionsWidthInCm: data.drawingDimensionsWidthInCm || undefined,
                drawingDimensionsHeightInCm: data.drawingDimensionsHeightInCm || undefined,
                paintingSurface: data.paintingSurface || undefined,
                paintingMaterial: data.paintingMaterial || undefined,
                paintingDimensionsWidthInCm: data.paintingDimensionsWidthInCm || undefined,
                paintingDimensionsHeightInCm: data.paintingDimensionsHeightInCm || undefined
            };

            await axios.put(`http://localhost:8080/artworks/artist/${id}`, updatedData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt}`
                }
            });

            if (selectedFile instanceof File) {
                const formData = new FormData();
                formData.append('file', selectedFile);

                await axios.post(`http://localhost:8080/artworks/artist/${id}/image`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${jwt}`
                    }
                });
            }

            alert('Artwork updated successfully!');
            navigate('/artistgallery');
        } catch (error) {
            setError('Failed to update artwork. Please check your data and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.pageContainer}>
            <h1>Edit Artwork</h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <form className={styles.editArtworkForm} onSubmit={handleSubmit(submitEditedArtwork)}>
                <div className={styles.allInputWrapper}>
                    <div className={styles.imageContainer}>
                        {previewUrl ? (
                            <img src={previewUrl} alt="New Preview" className={styles.imagePreview}/>
                        ) : (
                            currentImageUrl && (
                                <img src={currentImageUrl} alt="Current Artwork" className={styles.imagePreview}/>
                            )
                        )}
                        <label htmlFor="fileInput" className={styles.uploadLabel}>
                            <FontAwesomeIcon icon={faUpload} className={styles.uploadIcon}/>
                            Upload new Image
                        </label>
                        <input
                            id="fileInput"
                            type="file"
                            accept=".jpeg,.jpg,.png"
                            onChange={handleFileChange}
                            className={styles.fileInput}
                        />
                        {selectedFile && <span className={styles.fileName}>{selectedFile.name}</span>}
                    </div>
                    <div className={styles.inputFieldWrapper}>
                        <label htmlFor="title" className={styles.label}>Artwork Title</label>
                        <input
                            id="title"
                            type="text"
                            className={styles.inputField}
                            {...register('title', {required: true})}
                        />
                        <label htmlFor="artist" className={styles.label}>Artist Name</label>
                        <input
                            id="artist"
                            type="text"
                            className={styles.inputField}
                            disabled={true}
                            {...register('artist', {required: true})}
                        />
                        <label htmlFor="description" className={styles.label}>Artwork Description</label>
                        <textarea
                            id="description"
                            className={styles.inputField}
                            {...register('description', {required: true})}
                        />
                        <label htmlFor="dateCreated" className={styles.label}>Date Created</label>
                        <input
                            id="dateCreated"
                            type="date"
                            className={styles.inputField}
                            {...register('dateCreated', {required: true})}
                        />

                        <label htmlFor="galleryBuyingPrice" className={styles.label}>Gallery Buying Price in Euro €</label>
                        <input
                            id="galleryBuyingPrice"
                            type="number"
                            className={styles.inputField}
                            {...register('galleryBuyingPrice', {required: true})}
                        />
                        <label htmlFor="edition" className={styles.label}>Edition</label>
                        <select id="edition" className={styles.inputField} {...register('edition', {required: true})}>
                            <option value="">Select Edition</option>
                            <option value="Single / Unique edition">Single / Unique edition</option>
                            <option value="Part of a series">Part of a series</option>
                            <option value="Reproduction">Reproduction</option>
                            <option value="To be decided">To be decided</option>
                        </select>
                        <label htmlFor="artworkType" className={styles.label}>Artwork Type</label>
                        <input
                            id="artworkType"
                            type="text"
                            className={styles.inputField}
                            value={artworkType}
                            disabled
                        />
                        {artworkType === 'drawing' && (
                            <>
                                <label htmlFor="drawingSurface" className={styles.label}>Drawing Surface</label>
                                <input
                                    id="drawingSurface"
                                    type="text"
                                    className={styles.inputField}
                                    {...register('drawingSurface')}
                                />
                                <label htmlFor="drawingMaterial" className={styles.label}>Drawing Material</label>
                                <input
                                    id="drawingMaterial"
                                    type="text"
                                    className={styles.inputField}
                                    {...register('drawingMaterial')}
                                />
                                <label htmlFor="drawingDimensionsWidthInCm" className={styles.label}>Width in cm</label>
                                <input
                                    id="drawingDimensionsWidthInCm"
                                    type="number"
                                    className={styles.inputField}
                                    {...register('drawingDimensionsWidthInCm')}
                                />
                                <label htmlFor="drawingDimensionsHeightInCm" className={styles.label}>Height in
                                    cm</label>
                                <input
                                    id="drawingDimensionsHeightInCm"
                                    type="number"
                                    className={styles.inputField}
                                    {...register('drawingDimensionsHeightInCm')}
                                />
                            </>
                        )}
                        {artworkType === 'painting' && (
                            <>
                                <label htmlFor="paintingSurface" className={styles.label}>Painting Surface</label>
                                <input
                                    id="paintingSurface"
                                    type="text"
                                    className={styles.inputField}
                                    {...register('paintingSurface')}
                                />

                                <label htmlFor="paintingMaterial" className={styles.label}>Painting Material</label>
                                <input
                                    id="paintingMaterial"
                                    type="text"
                                    className={styles.inputField}
                                    {...register('paintingMaterial')}
                                />

                                <label htmlFor="paintingDimensionsWidthInCm" className={styles.label}>Width in
                                    cm</label>
                                <input
                                    id="paintingDimensionsWidthInCm"
                                    type="number"
                                    className={styles.inputField}
                                    {...register('paintingDimensionsWidthInCm')}
                                />
                                <label htmlFor="paintingDimensionsHeightInCm" className={styles.label}>Height in
                                    cm</label>
                                <input
                                    id="paintingDimensionsHeightInCm"
                                    type="number"
                                    className={styles.inputField}
                                    {...register('paintingDimensionsHeightInCm')}
                                />
                            </>
                        )}
                    </div>
                </div>
                <div className={styles.buttonWrapper}>
                    <Button text="Cancel" onClick={() => navigate('/artistgallery')}/>
                    <Button type="submit" text="Update Artwork"/>
                </div>
            </form>
        </div>
    );
};

export default EditArtwork;