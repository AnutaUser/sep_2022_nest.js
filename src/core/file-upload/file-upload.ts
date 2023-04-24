import { HttpException, HttpStatus } from '@nestjs/common';

export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const randomName = Array(8)
    .fill(0)
    .map(() => Math.round(Math.random() * 10).toString())
    .join('');
  callback(null, `${name}${randomName}`);
};

export const imgFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|svg|png)$/)) {
    return callback(
      new HttpException(
        'Only allowed format: jpg, jpeg, svg, png',
        HttpStatus.BAD_REQUEST,
      ),
      false,
    );
  }

  callback(null, true);
};
