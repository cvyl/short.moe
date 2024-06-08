import { saveAs } from 'file-saver';
import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react';

const _qrid = 'qrcode';

const handleDownload = () => {
    const canvasContainer = document.getElementById(_qrid) as HTMLDivElement;
    const canvas = canvasContainer.getElementsByTagName('canvas')[0];

    if (!canvas) {
        return;
    }
    const png = canvas.toDataURL('image/png');
    saveAs(png, 'qrcode.png');
}

type QRCodeProps = {
    url: string;
    size: number;
};

export function UrlQRCode({ url, size }: QRCodeProps) {
    return (
        <div className="flex flex-col items-center">
            <QRCodeCanvas
                id={_qrid}
                value={url}
                size={size}
            />
            <button
                onClick={handleDownload}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
                Download
            </button>
        </div>
    );
}