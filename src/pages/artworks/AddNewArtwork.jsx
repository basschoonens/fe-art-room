import styles from './AddNewArtwork.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUpload} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import {useForm} from 'react-hook-form';
import axios from 'axios';

const AddNewArtwork = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [artworkType, setArtworkType] = React.useState('');
    const [selectedFile, setSelectedFile] = React.useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    const onSubmit = async (data) => {

        const jwt = localStorage.getItem('jwt');

        console.log(data);

        try {
            const artworkResponse = await axios.post('http://localhost:8080/artworks', {
                title: data.title,
                artist: data.artist,
                description: data.description,
                dateCreated: data.dateCreated,
                galleryBuyingPrice: data.galleryBuyingPrice,
                edition: data.edition,
                artworkType: artworkType,
                drawingDrawType: data.drawingDrawType,
                drawingSurface: data.drawingSurface,
                drawingMaterial: data.drawingMaterial,
                drawingDimensionsWidthInCm: data.drawingDimensionsWidthInCm,
                drawingDimensionsHeightInCm: data.drawingDimensionsHeightInCm
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt}`
                }
            });
            const artworkId = (artworkResponse.headers["location"].split('/').pop());
            console.log(artworkId);
            console.log(artworkResponse);
            console.log(artworkResponse.headers["location"]);
            console.log('Artwork POST request complete.');
            if (data.file[0]) {
                const formData = new FormData();
                formData.append('file', data.file[0]);

                await axios.post(`http://localhost:8080/artworks/${artworkId}/image`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${jwt}`
                    }
                });
                alert('Artwork and image uploaded successfully.');
            }
        } catch (error) {
            console.error('Error uploading artwork:', error);
            alert('Failed to upload artwork.');
        }
    };

    //         if (data.file[0]) {
    //             const formData = new FormData();
    //             formData.append('file', data.file[0]);
    //
    //             await axios.post(`/api/artworks/${artworkId}/image`, formData, {
    //                 headers: {
    //                     'Content-Type': 'multipart/form-data',
    //                     'Authorization': `Bearer ${jwt}`
    //                 }
    //             });
    //             alert('Artwork and image uploaded successfully.');
    //         }
    //     } catch (error) {
    //         console.error('Error uploading artwork:', error);
    //         alert('Failed to upload artwork.');
    //     }
    // };

    // const onSubmit = async (data) => {
    //     setLoading(true);
    //     setError(null);
    //
    //     const jwt = localStorage.getItem('jwt');
    //     const abortController = new AbortController();
    //
    //     const headers = {
    //         "Content-Type": 'multipart/form-data',
    //         "Authorization": `Bearer ${jwt}`
    //     };
    //
    //     try {
    //         console.log('Making POST request to add artwork with image...');
    //
    //         const formData = new FormData();
    //         formData.append('artworkType', artworkType);
    //         Object.entries(data).forEach(([key, value]) => {
    //             if (key !== 'file') {
    //                 formData.append(key, value);
    //             }
    //         });
    //         formData.append('file', data.file[0]);
    //
    //         const artworkResponse = await axios.post('http://localhost:8080/artworks/user', formData, {
    //             signal: abortController.signal,
    //             headers
    //         });
    //
    //         console.log('Artwork POST request complete.');
    //         console.log('Response:', artworkResponse);
    //     } catch (error) {
    //         setError(error);
    //         console.error('Error uploading artwork:', error.response ? error.response.data : error.message);
    //     }
    //     setLoading(false);
    //     return () => {
    //         abortController.abort();
    //     }
    // };

    return (
        <div className={styles.pageContainer}>
            <h1>Create new artwork</h1>
            <p>Fill in the form below to add your new artwork to the gallery</p>
            <form className={styles.addArtworkForm} onSubmit={handleSubmit(onSubmit)}>
                {/*TODO check if empty label is neccesary everywhere.*/}
                <input type="text" className={styles.inputField}
                       placeholder="Please enter the title of your artwork"
                       {...register('title', {required: true})} />
                {errors.title && <span className={styles.errorMessage}>Title is required</span>}
                <input type="text" className={styles.inputField}
                       placeholder="Please enter your artist name for this artwork"
                       {...register('artist', {required: true})} />
                {errors.artist && <span className={styles.errorMessage}>Description is required</span>}
                <textarea className={styles.inputField}
                          placeholder="Please enter a description of the artwork"
                          {...register('description', {required: true})}></textarea>
                {errors.description && <span className={styles.errorMessage}>Description is required</span>}
                <input type="date" className={styles.inputField}
                       placeholder="Please enter the date the artwork was created"
                       {...register('dateCreated', {required: true})} />
                {errors.dateCreated && <span className={styles.errorMessage}>Date created is required</span>}
                <span className={styles.currencyWrapper}>
                <p>€</p>
                <input
                    className={styles.inputField}
                    type="number"
                    placeholder="Please enter the selling price of the artwork"
                    {...register('galleryBuyingPrice', {required: true})} // Register the price field
                />
                </span>
                {errors.galleryBuyingPrice && <span className={styles.errorMessage}>Selling price is required</span>}
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
                {artworkType === 'drawing' && (
                    <>
                        <input type="text" className={styles.inputField}
                               placeholder="Please enter the type of drawing"
                               {...register('drawingDrawType')} />
                        <input type="text" className={styles.inputField}
                               placeholder="Please enter the surface used"
                               {...register('drawingSurface')} />
                        <input type="text" className={styles.inputField}
                               placeholder="Please enter chosen material with which the drawing was made"
                               {...register('drawingMaterial')} />
                        <input type="number" className={styles.inputField}
                               placeholder="Please enter the width size in cm"
                               {...register('drawingDimensionsWidthInCm')} />
                        <input type="number" className={styles.inputField}
                               placeholder="Please enter the height size in cm"
                               {...register('drawingDimensionsHeightInCm')} />
                    </>
                )}
                {artworkType === 'painting' && (
                    <>
                        <>
                            <input type="text" className={styles.inputField}
                                   placeholder="Please enter the type of painting"
                                   {...register('paintingPaintType')} />
                            <input type="text" className={styles.inputField}
                                   placeholder="Please enter the surface used"
                                   {...register('paintingSurface')} />
                            <input type="text" className={styles.inputField}
                                   placeholder="Please enter chosen material with which the drawing was made"
                                   {...register('paintingMaterial')} />
                            <input type="number" className={styles.inputField}
                                   placeholder="Please enter the width size in cm"
                                   {...register('paintingDimensionsWidthInCm')} />
                            <input type="number" className={styles.inputField}
                                   placeholder="Please enter the height size in cm"
                                   {...register('paintingDimensionsHeightInCm')} />
                        </>
                    </>
                )}
                <div className={styles.imageContainer}>
                    <label htmlFor="fileInput" className={styles.uploadLabel}>
                        <FontAwesomeIcon icon={faUpload}/>
                        &nbsp;Upload Image
                    </label>
                    <input
                        id="fileInput"
                        className={styles.fileInput}
                        type="file"
                        {...register('file', {required: true})}
                        onChange={(e) => {
                            e.preventDefault(); // Prevent page scroll to top
                            handleFileChange(e);
                        }}
                    />
                    {selectedFile && <span className={styles.fileName}>{selectedFile.name}</span>}
                </div>
                <button className={styles.registerButton} type="submit">Add Artwork</button>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p>Something went wrong while adding the artwork. Please try again.</p>}
        </div>
    );
};

export default AddNewArtwork;