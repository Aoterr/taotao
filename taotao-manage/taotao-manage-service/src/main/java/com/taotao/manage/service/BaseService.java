package com.taotao.manage.service;
import java.util.Date;
import java.util.List;
import com.github.abel533.entity.Example;
import com.github.abel533.mapper.Mapper;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.taotao.manage.pojo.BasePojo;
public abstract class BaseService<T extends BasePojo> {
	
	public abstract Mapper<T> getMapper();
	
	/**
	 * 根据id查询数据
	 * 
	 * @param id
	 * @return
	 */
	public T queryById(Long id){
		
		return this.getMapper().selectByPrimaryKey(id);
	}
	/**
	 * 查询所有数据
	 * 
	 * @return
	 */
	public List<T> queryAll(){
		return this.getMapper().select(null);
	}
	/**
	 * 根据条件查询一条数据，如果返回多条数据，抛出异常
	 * 
	 * @param record
	 * @return
	 */
	public T queryOne(T record){
		return this.getMapper().selectOne(record);
	}
	
	/**
	 * 根据条件查询多条数据
	 * 
	 * @param record
	 * @return
	 */
	public List<T> queryListByWhere(T record){
		return this.getMapper().select(record);
	}
	
	/**
	 * 根据条件分页查询
	 * 
	 * @param record
	 * @param page
	 * @param row
	 * @return
	 */
	public PageInfo<T> queryPageListByWhere(T record,Integer page,Integer row){
		
		PageHelper.startPage(page,row);
		List<T> list= this.getMapper().select(record);
		return new PageInfo<T>(list);
	}
	
	/**
	 * 添加数据
	 * 
	 * @param record
	 * @return
	 */
	public Integer save(T record){
		record.setCreated(new Date());
		record.setUpdated(record.getCreated());
		return this.getMapper().insert(record);
	}
	
	/**
	 * 选择不为null的字段做插入
	 * 
	 * @param record
	 * @return
	 */
	public Integer saveSelective(T record){
		record.setCreated(new Date());
		record.setUpdated(record.getCreated());
		return this.getMapper().insertSelective(record);
	}
	
	/**
	 * 更新数据
	 * 
	 * @param record
	 * @return
	 */
	public Integer update(T record){
		record.setUpdated(new Date());
		return this.getMapper().updateByPrimaryKey(record);
	}
	
	/**
	 * 选择不为null的字段做更新数据
	 * 
	 * @param record
	 * @return
	 */
	public Integer updateSelective(T record){
		record.setUpdated(new Date());
		record.setCreated(null);
		return this.getMapper().updateByPrimaryKeySelective(record);
	}
	
	/**
	 * 根据主键删除，物理删除
	 * 
	 * @param id
	 * @return
	 */
	public Integer deleteById(Long id){
		return this.getMapper().deleteByPrimaryKey(id);
	}
	
	/**
	 * 批量删除数据
	 * 
	 * @param ids
	 * @param clzz
	 * @param property
	 * @return
	 */
	public Integer deleteByIds(List<Object> ids,Class<T> clzz,String property){
		Example example = new Example(clzz);
		example.createCriteria().andIn(property, ids);
		return this.getMapper().deleteByExample(example);
	}
	
	/**
	 * 根据条件删除数据
	 * 
	 * @param record
	 * @return
	 */
	public Integer deleteByWhere(T record){
		return this.getMapper().delete(record);
	}
	
}