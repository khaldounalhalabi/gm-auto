import ImagePreview from "@/Components/show/ImagePreview";

const Gallery = ({
    sources,
}: {
    sources: (string | undefined)[] | undefined;
}) => {
    return (
        <div className={`grid grid-cols-1 md:grid-cols-4 w-full gap-5`}>
            {sources?.map(
                (img: string | undefined, index) =>
                    img && (
                        <div key={index} className="h-40">
                            <ImagePreview src={img} />
                        </div>
                    ),
            )}
        </div>
    );
};

export default Gallery;
