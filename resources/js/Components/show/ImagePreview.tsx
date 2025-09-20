import React, { HTMLProps, useState } from "react";

interface ImgProps
    extends Omit<HTMLProps<HTMLImageElement>, "className" | "alt"> {
    caption?: string;
    src: string;
}

const ImagePreview: React.FC<ImgProps> = ({ caption, src, ...props }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div
            className={`flex justify-center items-center  ${isExpanded ? "fixed top-0 left-0 z-50 w-full h-full bg-black opacity-95" : "h-full w-full"}`}
            onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(false);
            }}
        >
            <div
                className={` rounded-md cursor-pointer transition duration-300 transform ${isExpanded ? "scale-110" : "h-full w-full object-contain overflow-hidden"}`}
                onClick={(e) => {
                    e.stopPropagation();
                    setIsExpanded(true);
                }}
            >
                <img
                    src={src}
                    className={`${isExpanded ? "max-w-screen max-h-screen" : "h-full w-full max-w-40 object-cover rounded-full "}`}
                    {...props}
                    alt={caption}
                />
                {isExpanded && (
                    <p
                        className={
                            "text-white text-xl bg-black text-center opacity-90"
                        }
                    >
                        {caption}
                    </p>
                )}
            </div>
        </div>
    );
};

export default ImagePreview;
