import styles from './AddNewArtwork.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUpload} from '@fortawesome/free-solid-svg-icons';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import Button from "../../../components/button/Button.jsx";
import {useNavigate} from "react-router-dom";
import {validateFile} from "../../../helpers/fileValidation.js";
import {AuthContext} from "../../../context/AuthContext.jsx";

const AddNewArtwork = () => {
    const {register, handleSubmit, setValue, formState: {errors}} = useForm();
    const [loading, setLoading] = React.useState(false);
    const {user} = React.useContext(AuthContext);
    const [error, setError] = React.useState(null);
    const [artworkType, setArtworkType] = React.useState('');
    const [selectedFile, setSelectedFile] = React.useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const navigate = useNavigate();

    const submitNewArtwork = async (data) => {
        setLoading(true);
        setError(null);
        const jwt = localStorage.getItem('jwt');
        try {
            const artworkResponse = await axios.post('http://localhost:8080/artworks/artist', {
                title: data.title,
                artist: data.artist,
                description: data.description,
                dateCreated: data.dateCreated,
                galleryBuyingPrice: data.galleryBuyingPrice,
                edition: data.edition,
                artworkType: artworkType,
                drawingSurface: artworkType === 'drawing' ? data.drawingSurface : undefined,
                drawingMaterial: artworkType === 'drawing' ? data.drawingMaterial : undefined,
                drawingDimensionsWidthInCm: artworkType === 'drawing' ? data.drawingDimensionsWidthInCm : undefined,
                drawingDimensionsHeightInCm: artworkType === 'drawing' ? data.drawingDimensionsHeightInCm : undefined,
                paintingSurface: artworkType === 'painting' ? data.paintingSurface : undefined,
                paintingMaterial: artworkType === 'painting' ? data.paintingMaterial : undefined,
                paintingDimensionsWidthInCm: artworkType === 'painting' ? data.paintingDimensionsWidthInCm : undefined,
                paintingDimensionsHeightInCm: artworkType === 'painting' ? data.paintingDimensionsHeightInCm : undefined
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt}`
                }
            });

            const artworkId = (artworkResponse.headers["location"].split('/').pop());

            if (selectedFile instanceof File) {
                const formData = new FormData();
                formData.append('file', selectedFile);

                await axios.post(`http://localhost:8080/artworks/artist/${artworkId}/image`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${jwt}`
                    }
                });
            }
            if (artworkResponse.status === 201) {
                alert('Artwork added successfully!');
            }
            navigate('/artistgallery');
        } catch (error) {
            alert('Failed to upload artwork, please check if the data you provided is correct.');
        }

        setLoading(false);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && validateFile(file)) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        } else {
            setSelectedFile(null);
            setPreviewUrl(null);
            e.target.value = '';
        }
    };

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    useEffect(() => {
        if (user && user.username) {
            // Set the default value for the artist name to the logged-in user's username
            setValue('artist', user.username);
        }
    }, [user, setValue]);

    return (
        <div className={styles.pageContainer}>
            <h1>Create new artwork</h1>
            <form className={styles.addArtworkForm} onSubmit={handleSubmit(submitNewArtwork)}>
                <div className={styles.addArtworkFormContainer}>
                    <div className={styles.imageContainer}>
                        {previewUrl && <img src={previewUrl} alt="Preview" className={styles.previewImage}/>}
                        <label htmlFor="fileInput" className={styles.uploadLabel}>
                            <FontAwesomeIcon icon={faUpload} className={styles.uploadIcon}/>
                            Upload Image
                        </label>
                        <input
                            id="fileInput"
                            type="file"
                            className={styles.fileInput}
                            accept=".jpeg,.jpg,.png"
                            onChange={handleFileChange}
                        />
                        {errors.file && <span className={styles.error}>{errors.file.message}</span>}
                        {selectedFile && <span className={styles.fileName}>{selectedFile.name}</span>}
                    </div>
                    <div className={styles.inputFieldWrapper}>
                        <input type="text" className={styles.inputField}
                               placeholder="Enter the title of your artwork"
                               {...register('title', {required: true})} />
                        {errors.title && <span className={styles.errorMessage}>Title is required</span>}
                        <input type="text" className={styles.inputField}
                               placeholder="Enter your artist name for this artwork"
                               {...register('artist', {required: true})} />
                        {errors.artist && <span className={styles.errorMessage}>Artist name is required</span>}
                        <textarea className={styles.inputField}
                                  placeholder="Enter a description of the artwork"
                                  {...register('description', {required: true})}></textarea>
                        {errors.description && <span className={styles.errorMessage}>Description is required</span>}
                        <input type="date" className={styles.inputField}
                               placeholder="Enter the date the artwork was created"
                               {...register('dateCreated', {required: true})} />
                        {errors.dateCreated && <span className={styles.errorMessage}>Date created is required</span>}
                        <span className={styles.currencyWrapper}>
                            <label htmlFor="galleryBuyingPrice">€</label>
                            <input
                                className={styles.inputField}
                                type="number"
                                placeholder="Enter the buying price for the gallery"
                                min="0"  // Prevents entering negative numbers
                                {...register('galleryBuyingPrice', {
                                    required: "Buying price is required",
                                    min: {
                                        value: 0,
                                        message: "Buying price cannot be negative"
                                    }
                                })}
                            />
                        </span>
                        {errors.galleryBuyingPrice &&
                            <span className={styles.errorMessage}>{errors.galleryBuyingPrice.message}</span>}
                        <select className={styles.inputField} {...register('edition', {required: true})}>
                            <option value="" disabled>Select edition type</option>
                            <option value="Single / Unique edition">Single / Unique edition</option>
                            <option value="Part of a series">Part of a series</option>
                            <option value="Reproduction">Reproduction</option>
                            <option value="To be decided">To be decided</option>
                        </select>
                        {errors.edition && <span className={styles.errorMessage}>Edition type is required</span>}
                        <div className={styles.radioContainer}>
                            <div className={styles.radioWrapper}>
                                <p>Please select your artwork type :</p>
                                <div className={styles.checkboxWrapper}>
                                    <div className={styles.radioInputWrapper}>
                                        <input
                                            type="radio"
                                            value="drawing"
                                            id="drawing"
                                            className={styles.radioInput}
                                            checked={artworkType === 'drawing'}
                                            onChange={() => setArtworkType('drawing')}
                                        />
                                        <label htmlFor="drawing" className={styles.customRadio}></label>
                                        <label htmlFor="drawing" className={styles.radioLabel}>Drawing</label>
                                    </div>
                                    <div className={styles.radioInputWrapper}>
                                        <input
                                            type="radio"
                                            value="painting"
                                            id="painting"
                                            className={styles.radioInput}
                                            checked={artworkType === 'painting'}
                                            onChange={() => setArtworkType('painting')}
                                        />
                                        <label htmlFor="painting" className={styles.customRadio}></label>
                                        <label htmlFor="painting" className={styles.radioLabel}>Painting</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {artworkType === 'drawing' && (
                            <>
                                <input type="text" className={styles.inputField}
                                       placeholder="Enter the surface used"
                                       {...register('drawingSurface')} />
                                <input type="text" className={styles.inputField}
                                       placeholder="Enter chosen material with which the drawing was made"
                                       {...register('drawingMaterial')} />
                                <input type="number" className={styles.inputField}
                                       placeholder="Enter the width size in cm"
                                       {...register('drawingDimensionsWidthInCm')} />
                                <input type="number" className={styles.inputField}
                                       placeholder="Enter the height size in cm"
                                       {...register('drawingDimensionsHeightInCm')} />
                            </>
                        )}
                        {artworkType === 'painting' && (
                            <>
                                <>
                                    <input type="text" className={styles.inputField}
                                           placeholder="Enter the surface used"
                                           {...register('paintingSurface')} />
                                    <input type="text" className={styles.inputField}
                                           placeholder="Enter chosen material with which the drawing was made"
                                           {...register('paintingMaterial')} />
                                    <input type="number" className={styles.inputField}
                                           placeholder="Enter the width size in cm"
                                           {...register('paintingDimensionsWidthInCm')} />
                                    <input type="number" className={styles.inputField}
                                           placeholder="Enter the height size in cm"
                                           {...register('paintingDimensionsHeightInCm')} />
                                </>
                            </>
                        )}
                    </div>
                </div>
                <div className={styles.buttonWrapper}>
                    <Button className={styles.cancelButton} type="button" text="Cancel"
                            onClick={() => navigate('/artistgallery')}/>
                    <Button className={styles.registerButton} type="submit" text="Add new Artwork"/>
                </div>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p>Something went wrong while adding the artwork. Please try again.</p>}
        </div>
    );
};

export default AddNewArtwork;