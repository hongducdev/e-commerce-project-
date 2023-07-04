import React from 'react';
import {useForm} from "react-hook-form";
import {InputForm, Select} from "../../components";
import {useSelector} from "react-redux";

const CreateProduct = () => {

  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
    watch
  } = useForm()
  const {categories} = useSelector(state => state.app)
  const handleCreateProduct = async (data) => {
  }

  return (
    <div>
      <div className="w-full p-4 border-b border-gray-300">
        <span className="font-semibold text-4xl text-grayDark">
          Create Product
        </span>
      </div>
      <div className="p-4">
        <form onSubmit={handleSubmit(handleCreateProduct)} className="flex flex-col gap-4">
          <InputForm
            label="Name Product"
            register={register}
            errors={errors}
            id="title"
            placeholder="Name product"
            validate={{
              required: "Name is required",
            }}
            fullWidth
          />
          <div className="flex w-full gap-4">
            <InputForm
              label="Price"
              type="number"
              register={register}
              errors={errors}
              id="price"
              placeholder="Price"
              validate={{
                required: "Price is required",
              }}
              fullWidth
              style="flex-1"
            />
            <InputForm
              label="Quantity"
              type="number"
              register={register}
              errors={errors}
              id="quantity"
              placeholder="Quantity"
              validate={{
                required: "Quantity is required",
              }}
              fullWidth
              style="flex-1"
            />
          </div>
          <div className="flex w-full gap-4">
            <Select
              label="Category"
              register={register}
              errors={errors}
              id="category"
              options={categories?.map(category => ({
                code: category._id,
                value: category.title
              }))}
              validate={{
                required: "Category is required",
              }}
              style="flex-1"
              />
            <Select
              label="Brand"
              register={register}
              errors={errors}
              id="brand"
              options={
                categories?.find(category => category._id === watch('category'))?.brand?.map(brand => ({
                  code: brand,
                  value: brand
                }))
              }
              validate={{
                required: "Brand is required",
              }}
              style="flex-1"
              />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
