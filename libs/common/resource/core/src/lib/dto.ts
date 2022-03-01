export interface Dto {
  id: string;
}

// type with all properties from TDto, excluding id
export type CreateDto<TDto extends Dto> = Omit<TDto, 'id'>;

// type with only id property from TDto + all properties as optional from TCreateDto
export type UpdateDto<TDto extends Dto, TCreateDto = CreateDto<TDto>> = Pick<
  TDto,
  'id'
> &
  Partial<TCreateDto>;
export type ResetDto<TDto extends Dto> = UpdateDto<TDto>;
