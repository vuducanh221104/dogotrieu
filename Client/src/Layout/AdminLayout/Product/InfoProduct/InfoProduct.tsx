import React from 'react';
import { Modal, Descriptions, Image, Tag, Tooltip } from 'antd';
import MarkdownRender from '@/components/MarkdownRender';

interface InfoProductProps {
    visible: boolean;
    onClose: () => void;
    product: any;
}

const InfoProduct: React.FC<InfoProductProps> = ({ visible, onClose, product }) => {
    return (
        <Modal title="Product Information" visible={visible} onCancel={onClose} footer={null} width={800}>
            <Descriptions bordered column={1}>
                <Descriptions.Item label="Product ID">{product._id}</Descriptions.Item>
                <Descriptions.Item label="Name">{product.name}</Descriptions.Item>
                <Descriptions.Item label="SKU">{product.product_type_id.sku}</Descriptions.Item>
                <Descriptions.Item label="Price">
                    Original: {product.price.original} {product.price.currency}
                    <br />
                    Discount: {product.price.discount} {product.price.currency}
                    <br />
                    Discount Quantity: {product.price.discount_quantity}
                </Descriptions.Item>
                <Descriptions.Item label="Thumbnail">
                    <Image height={160} src={product.thumb} alt={product.name} />
                </Descriptions.Item>
                <Descriptions.Item label="Shipping">{product.ship ? 'Yes' : 'No'}</Descriptions.Item>
                <Descriptions.Item label="Quantity">{product.quantity}</Descriptions.Item>
                {/* <Descriptions.Item label="Slug">{product.slug}</Descriptions.Item> */}
                <Descriptions.Item label="Tags">
                    {product.product_type_id.tags.map((tag: string, index: number) => (
                        <Tag color="blue" key={index}>
                            {tag}
                        </Tag>
                    ))}
                </Descriptions.Item>
                <Descriptions.Item label="Description">
                    {<MarkdownRender content={product.product_type_id.description} />}
                </Descriptions.Item>
                <Descriptions.Item label="Dimensions">
                    Width: {product.product_type_id.dimensions.width} {product.product_type_id.dimensions.unit}
                    <br />
                    Height: {product.product_type_id.dimensions.height} {product.product_type_id.dimensions.unit}
                    <br />
                    Length: {product.product_type_id.dimensions.length} {product.product_type_id.dimensions.unit}
                </Descriptions.Item>
                <Descriptions.Item label="Images">
                    {product.product_type_id.images.map((image: string, index: number) => (
                        <Image
                            key={index}
                            width={100}
                            src={image}
                            alt={`Product image ${index + 1}`}
                            style={{ marginRight: 10, marginBottom: 10 }}
                        />
                    ))}
                </Descriptions.Item>
                <Descriptions.Item label="Material">
                    {product.material_id.map((material: any, index: number) => (
                        <div key={index}>
                            <Tooltip
                                title={
                                    material.parent_id ? (
                                        <>
                                            Parent: {material.parent_id.name}
                                            <br />
                                            Child: {material.name}
                                        </>
                                    ) : (
                                        <>Parent: {material.name}</>
                                    )
                                }
                            >
                                <Tag color="green">
                                    {material.parent_id
                                        ? `${material.parent_id.name}: ${material.name}`
                                        : material.name}
                                </Tag>
                            </Tooltip>
                        </div>
                    ))}
                </Descriptions.Item>
                <Descriptions.Item label="Categories">
                    {product.category_id.map((category: any, index: number) => (
                        <div key={index}>
                            <Tooltip
                                title={
                                    category.parent_id ? (
                                        <>
                                            Parent: {category.parent_id.name}
                                            <br />
                                            Child: {category.name}
                                        </>
                                    ) : (
                                        <>Parent: {category.name}</>
                                    )
                                }
                            >
                                <Tag color="purple">
                                    {category.parent_id
                                        ? `${category.parent_id.name}: ${category.name}`
                                        : category.name}
                                </Tag>
                            </Tooltip>
                        </div>
                    ))}
                </Descriptions.Item>
                <Descriptions.Item label="Created At">{product.created_at}</Descriptions.Item>
                <Descriptions.Item label="Updated At">{product.updated_at}</Descriptions.Item>
            </Descriptions>
        </Modal>
    );
};

export default InfoProduct;
