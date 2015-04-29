class AddHouseSquareFeetToUsers < ActiveRecord::Migration
  def change
    add_column :users, :roof_sq_ft, :integer
  end
end
