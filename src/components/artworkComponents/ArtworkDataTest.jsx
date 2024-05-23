import React, { useState } from 'react';
import UserCardTest from '../artworkComponents/artworkCards/user/UserCardTest.jsx';
import UserModalTest from '../artworkComponents/artworksModals/UserModalTest.jsx';

export default function ArtworkDataTest({ artwork }) {
    const { id, title, artist, artworkType, averageRating, dateCreated, description, edition, image, paintingData, sellingPrice } = artwork;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <>
            <UserCardTest
                key={id}
                title={title}
                artist={artist}
                imageUrl={`http://localhost:8080/artworks/${id}/image`}
                onClick={handleOpenModal} // Open modal on click
            />
            {isModalOpen && (
                <UserModalTest
                    key={id}
                    title={title}
                    artist={artist}
                    artworkType={artworkType}
                    averageRating={averageRating}
                    dateCreated={dateCreated}
                    description={description}
                    edition={edition}
                    imageUrl={`http://localhost:8080/artworks/${id}/image`}
                    paintingData={paintingData}
                    sellingPrice={sellingPrice}
                    onClose={handleCloseModal}
                />
            )}
        </>
    );
}