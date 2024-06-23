import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUpload} from '@fortawesome/free-solid-svg-icons';
import Button from '../../../components/button/Button.jsx';
import styles from './EditArtwork.module.css'; // Adjust path to your CSS module

const EditArtwork = () => {
    const {id} = useParams(); // Get artworkId from URL params
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}, setValue} = useForm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [artworkData, setArtworkData] = useState(null);
    const [artworkType, setArtworkType] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

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
                console.log('Artwork data:', response.data)
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
            } catch (error) {
                console.error('Error fetching artwork:', error);
                setError('Failed to fetch artwork data. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchArtwork();
    }, [id, setValue]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
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

            console.log('Updated Data:', updatedData);

            await axios.put(`http://localhost:8080/artworks/artist/${id}`, updatedData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt}`
                }
            });

            // If a new file is selected, upload the image
            if (selectedFile) {
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
            navigate('/artistgallery'); // Redirect to gallery or artwork list page after update
        } catch (error) {
            console.error('Error updating artwork:', error);
            alert('Failed to update artwork. Please check your data and try again.');
            setError('Failed to update artwork. Please check your data and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.pageContainer}>
            <h1>Edit Artwork</h1>
            <form className={styles.editArtworkForm} onSubmit={handleSubmit(submitEditedArtwork)}>
                <div className={styles.imageContainer}>
                    <label htmlFor="fileInput" className={styles.uploadLabel}>
                        <FontAwesomeIcon icon={faUpload}/>
                        &nbsp;Upload Image
                    </label>
                    <input
                        id="fileInput"
                        className={styles.fileInput}
                        type="file"
                        onChange={handleFileChange}
                    />
                    {selectedFile && <span className={styles.fileName}>{selectedFile.name}</span>}
                </div>

                <div className={styles.inputFieldWrapper}>
                    <input
                        type="text"
                        className={styles.inputField}
                        placeholder="Artwork Title"
                        {...register('title', {required: true})}
                    />
                    {errors.title && <span className={styles.errorMessage}>Title is required</span>}

                    <input
                        type="text"
                        className={styles.inputField}
                        placeholder="Artist Name"
                        disabled={true}
                        {...register('artist', {required: true})}
                    />
                    {errors.artist && <span className={styles.errorMessage}>Artist name is required</span>}

                    <textarea
                        className={styles.inputField}
                        placeholder="Artwork Description"
                        {...register('description', {required: true})}
                    />
                    {errors.description && <span className={styles.errorMessage}>Description is required</span>}

                    <input
                        type="date"
                        className={styles.inputField}
                        placeholder="Date Created"
                        {...register('dateCreated', {required: true})}
                    />
                    {errors.dateCreated && <span className={styles.errorMessage}>Date created is required</span>}

                    <input
                        type="number"
                        className={styles.inputField}
                        placeholder="Gallery Buying Price"
                        {...register('galleryBuyingPrice', {required: true})}
                    />
                    {errors.galleryBuyingPrice && <span className={styles.errorMessage}>Price is required</span>}

                    <select className={styles.inputField} {...register('edition', {required: true})}>
                        <option value="">Select Edition</option>
                        <option value="Single / Unique edition">Single / Unique edition</option>
                        <option value="Part of a series">Part of a series</option>
                        <option value="Reproduction">Reproduction</option>
                        <option value="To be decided">To be decided</option>
                    </select>
                    {errors.edition && <span className={styles.errorMessage}>Edition type is required</span>}
                    <input
                        type="text"
                        className={styles.inputField}
                        placeholder="Artwork Type"
                        value={artworkType}
                        disabled
                    />
                    {artworkType === 'drawing' && (
                        <>
                            <input
                                type="text"
                                className={styles.inputField}
                                placeholder="Drawing Surface"
                                {...register('drawingSurface')}
                            />
                            <input
                                type="text"
                                className={styles.inputField}
                                placeholder="Drawing Material"
                                {...register('drawingMaterial')}
                            />
                            <input
                                type="number"
                                className={styles.inputField}
                                placeholder="Width in cm"
                                {...register('drawingDimensionsWidthInCm')}
                            />
                            <input
                                type="number"
                                className={styles.inputField}
                                placeholder="Height in cm"
                                {...register('drawingDimensionsHeightInCm')}
                            />
                        </>
                    )}
                    {artworkType === 'painting' && (
                        <>
                            <input
                                type="text"
                                className={styles.inputField}
                                placeholder="Painting Surface"
                                {...register('paintingSurface')}
                            />
                            <input
                                type="text"
                                className={styles.inputField}
                                placeholder="Painting Material"
                                {...register('paintingMaterial')}
                            />
                            <input
                                type="number"
                                className={styles.inputField}
                                placeholder="Width in cm"
                                {...register('paintingDimensionsWidthInCm')}
                            />
                            <input
                                type="number"
                                className={styles.inputField}
                                placeholder="Height in cm"
                                {...register('paintingDimensionsHeightInCm')}
                            />
                        </>
                    )}

                </div>

                <Button className={styles.submitButton} type="submit" text="Update Artwork"/>
            </form>
        </div>
    );
};

export default EditArtwork;